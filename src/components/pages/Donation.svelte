<script lang="ts">
	import { fetchDonationsData, datas_donations_persons } from "@/stores/donations_all_data";
	import { onMount, untrack } from "svelte";
	import Card from "../card.svelte";
	import ImageSkeleton from "../ImageSkeleton.svelte";
	import type { t_person_Data } from "@/types/t_person_data";

	let error_img = $state<string[]>([]);
    let is_loading:boolean=$state(false)
	function handleImageError(event: Event, person_name: string) {
		const image = event.currentTarget as HTMLImageElement;
		image.onerror = null; 
		if (!error_img.includes(person_name)) {
			error_img.push(person_name);
		}
	}

	const max_page = $derived($datas_donations_persons.max_page);
	let counter_page = $state(1);
	let datas_person = $state([] as t_person_Data[]);

	onMount(() => {
		fetchDonationsData({});
		const unsubscribe = datas_donations_persons.subscribe((store) => {
			const currentPageData = store.data[`page_${counter_page}`] || [];
			if (currentPageData.length > 0 && datas_person.length === 0) {
				datas_person = [...currentPageData];
			}
		});
		return unsubscribe;
	});

	// TULIS FUNGSI SCROLL DI SINI (Di luar $effect, tapi menggunakan untrack dengan benar)
	function handleScroll() {
        if(is_loading === true)return
		const totalHeight = document.documentElement.scrollHeight;
		const scrollPosition = window.scrollY;
		const viewportHeight = window.innerHeight;
		if (totalHeight - (scrollPosition + viewportHeight) < 650) {
            is_loading=true
			// Svelte 5 mengizinkan untrack di dalam fungsi eksternal yang dipanggil oleh effect
			setTimeout(()=>{
                is_loading=false
                untrack(() => {
                    if (counter_page < max_page) {
                        counter_page += 1;
                        const nextPageData = $datas_donations_persons.data[`page_${counter_page}`] || [];
                        datas_person = [...datas_person, ...nextPageData];
                    }
			    });
            },3000)
		}
	}

	// $effect di bawah ini SEKARANG BERSIH, hanya bertugas menempelkan event listener
	$effect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});
</script>

<div class="mx-3">
<div class="flex gap-3 justify-evenly flex-wrap">
        {#each datas_person as person}
        <!-- svelte-ignore attribute_quoted -->
        <Card card_description="{person.country_name}" card_title="{person.country_name}">
            <div class="flag relative">
                
                <img src="/palestine_flag.jpg" class="rounded-full w-[45px] h-[45px] absolute right-[-10px] bottom-[-20px]" alt="">
                <div class="{error_img.includes(person.name)?"block":"hidden"}">
                    <ImageSkeleton/>
                </div>
                <img src="{person.image}" alt="" srcset="" onerror={(event)=>handleImageError(event,person.name)} class="{error_img.includes(person.name)?"hidden":"block"}">
            </div>
           <div class="mt-4">
            <p>{person.name}</p>
            <p>{person.story.length>20?person.story.substring(1,20)+"...":person.story}</p>
            <button class="bg-green-400 text-white px-4 py-2 mt-4 rounded-md cursor-pointer w-full md:w-1/2">see me</button>
           </div>
        </Card>
    {/each}
</div>
<p class="{is_loading?"block":"hidden"} text-center">loading...</p>
    <div class="pagination flex gap-3 flex-wrap justify-center mt-5 relative hidden">
        {#each Array.from({length:max_page}) as _,idx}
           <div class="{counter_page==idx+1?"border-b-3 border-l-3":"px-1 py-1 before:absolute before:border-8"}  text-white">
             <button onclick={()=>counter_page=idx+1} class=" px-4 py-2 cursor-pointer all duration-300 {counter_page==idx+1?"text-green-900":"bg-green-400 hover:bg-green-600"}">page {idx+1}</button>
           </div>
        {/each}
    </div>
</div>