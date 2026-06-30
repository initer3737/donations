<script lang="ts">
	import { onMount, untrack } from "svelte";
	import ImageSkeleton from "../ImageSkeleton.svelte";
	import type { t_person_Data } from "@/types/t_person_data";
	import { datas_donations_person ,fetchDonationsDataSingle} from "@/stores/donations_single_data";
	import BreadCrumbsChangers from "../BreadCrumbsChangers.svelte";

    let is_loading:boolean=$state(true)
	let is_error_image:boolean=$state(false)

	
	const data_person = $derived($datas_donations_person.data[0]);
	const {country,id}=$props()
	const delay=(ms:number)=>{
			is_loading=false
		return new Promise((resolve)=>setTimeout(resolve,ms))
	}
	onMount(async()=>{
		await fetchDonationsDataSingle({id,country})
		await delay(3000)
	})
	type t_image_handler={
		event:Event
	}
	const image_error_handler=({event}:t_image_handler)=>{
		const image=event.target as HTMLImageElement
		image.onerror=null 
		is_error_image=true
	}
</script>

<div class="mx-3 flex justify-center w-full">
<BreadCrumbsChangers urls={['donation','detail']}/>
<div class="realtive">
	{#if data_person }
		{#if is_loading==true}
			<ImageSkeleton/>
		{:else}
			<div class="relative block">
			<div class="{is_error_image?"block":"hidden"} relative">
				<ImageSkeleton/>
				<img src="/palestine_flag.jpg" alt="" class="absolute rounded-full h-11 w-11 -bottom-2 left-0">
			</div>
				<div class="relative w-fit">
					<img src="{data_person.image}" alt="" class="rounded-md {is_error_image?"hidden":"block"}" onerror={(event)=>image_error_handler({event:event})}>
					<img src="/palestine_flag.jpg" alt="" class="absolute rounded-full h-11 w-11 -right-3 -bottom-2">
				</div>
			</div>

		{/if}
		
		<div class="flex flex-col gap-2">
			<p>country  {data_person.country_name}</p>
			<p>name {data_person.name}</p>
			<p class="w-2xl">story {data_person.story}</p>
			<div class="mt-4">
				{#each data_person.links as data_link}
					<a href="{data_link.url}" target="_blank" class="bg-green-400 px-3 py-4 rounded-md shadow-slate-400 shadow-2xl ease-in all duration-500 hover:bg-slate-300 hover:text-green-900">{data_link.name}</a>
				{/each}
			</div>
		</div>
	{/if}
</div>
<div class="flex gap-3 justify-evenly flex-wrap">
       
</div>
<!-- <p class="{is_loading?"block":"hidden"} text-center">loading...</p> -->
    
</div>