<script lang="ts">
    import { onMount } from 'svelte';
    import { datas_donations_persons, fetchDonationsData } from './../stores/donations_all_data'
    import type { t_person_Data } from '@/types/t_person_data'
    import Carousel from './Carousel.svelte';
    import palestine_flag from '../../public/palestine_flag.jpg'
   
    const flags={
        palestine:palestine_flag
    }
    const page_index = $state(1)
    let pagination = $derived("page_" + page_index)
    // 1. Ambil data asli dari store secara reaktif
    const data_get_data: t_person_Data[] | undefined = $derived($datas_donations_persons.data?.[pagination])
    //todo : membuat !!  jadi boolean murni
    let is_api_ok=$derived(!!(data_get_data&&data_get_data.length>0))
    
    // 2. Langsung picu fetch data API di sini saat komponen mendarat di browser!
    onMount(() => {
        fetchDonationsData({});
    });

    // Jalankan log di dalam $effect (bukan console.log biasa) agar terpantau saat data berubah dari kosong menjadi ada
    $effect(() => {
        console.log("Data donasi berhasil terisi di browser:", data_get_data);
    });

    // Fallback data gambar dummy picsum sewaktu nunggu API selesai loading
    const images2 = [
        { src: 'https://picsum.photos/400/300?random=1', story: 'Memuat data dari server...', links: [] },
        { src: 'https://picsum.photos/400/300?random=3', story: 'Memuat data dari server...', links: [] },
        { src: 'https://picsum.photos/400/300?random=2', story: 'Menghubungkan ke server...', links: [] }
    ];

    // 3. Petakan data asli jika sudah selesai di-fetch, jika belum pakai data dummy
    const finalImages = $derived(data_get_data && data_get_data.length > 0  
        ? data_get_data.map((value) => {
            const isValidImg = value.image && value.image.startsWith('http');
            return {
                src: isValidImg ? value.image : `https://picsum.photos/400/300?random=${value.id}`,
                story: value.story || '',
                links: value.links || []
            };
        }) 
        : images2
    );
</script>

<Carousel
    is_flag_appear={is_api_ok} 
    is_story_appear={true}
    duration_carousel={4500} 
    images={finalImages} 
    width_image_carousel="w-[25rem]" 
    height_image_carousel="h-[65rem] md:h-[15.5rem]" 
    children='' 
/>