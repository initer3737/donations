<script lang="ts">
    import { onMount } from 'svelte';
    import { datas_donations_persons, fetchDonationsData } from './../stores/donations_all_data'
    import type { t_person_Data } from '@/types/t_person_data'
    import Carousel from './Carousel.svelte';
    import palestine_flag from '../../public/palestine_flag.jpg'
   
    const flags={
        palestine:palestine_flag
    }
    let page_index = $state(1)
    const data_person = $derived($datas_donations_persons.data)
    const max_page = $derived(Object.keys(data_person).length)

    // ? setiap semua gambar di slide dan habis maka page akan di increment lalu page balik ke 1 ketika mentok dan image telah di slide mentok
    let pagination = $derived("page_" + page_index)

    // 1. Ambil data asli dari store secara reaktif
    const data_get_data: t_person_Data[] | undefined = $derived(data_person?.[pagination])
    //todo : membuat !!  jadi boolean murni
    let is_api_ok = $derived(!!(data_get_data && data_get_data.length > 0))

    // max images for current page (reactive setelah API loaded)
    const max_image_per_page = $derived(data_get_data?.length ?? 0)

    // const randomize=$derived(random_number <1?random_number+1:random_number)
    const duration_carousel = 4500
    let timeout_carousel:any
    
    // 2. Langsung picu fetch data API di sini saat komponen mendarat di browser!
    onMount(() => {
        fetchDonationsData({})
    });

    // Jalankan log di dalam $effect (bukan console.log biasa) agar terpantau saat data berubah dari kosong menjadi ada
    $effect(()=>{
        data_person
        page_index
        // max_image_per_page
        // data_get_data
        max_page
    })
    $effect(() => {
        // Hindari modulo by 0 saat API belum selesai / data kosong
        if (max_page <= 0 || max_image_per_page <= 0) return;

        // Clear timeout lama sebelum set timeout baru
        if (timeout_carousel) clearTimeout(timeout_carousel);

        timeout_carousel = setTimeout(() => {
            // page_index: 1..max_page
            page_index = ((page_index % max_page) + 1);
        }, duration_carousel * max_image_per_page);

        return () => {
            clearTimeout(timeout_carousel);
        };
    });

    // Fallback data gambar dummy picsum sewaktu nunggu API selesai loading
    const images2 = [
        { src: 'https://picsum.photos/400/300?random=1', story: 'load data from server...', links: [] },
        { src: 'https://picsum.photos/400/300?random=3', story: 'load data from server...', links: [] },
        { src: 'https://picsum.photos/400/300?random=2', story: 'connecting to server...', links: [] }
    ];

    // 3. Petakan data asli jika sudah selesai di-fetch, jika belum pakai data dummy
    const finalImages = $derived(data_get_data && data_get_data.length > 0  
        ? data_get_data.map((value) => {
            const isValidImg = value.image && value.image.startsWith('http');
            return {
                name:value.name,
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
    duration_carousel={duration_carousel} 
    images={finalImages} 
    width_image_carousel="w-[25rem]" 
    height_image_carousel="h-[65rem] md:h-[15.5rem]" 
    children='' 
/>