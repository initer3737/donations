<script lang="ts">
    import { onMount } from 'svelte';
    import type { Snippet } from 'svelte';
    import ImageSkeleton from './ImageSkeleton.svelte';
	import axios from 'axios';
    
    interface CarouselItemData {
        src: string;
        story?: string;
        links?: Array<{ name: string; url: string }>;
        [key: string]: any;
    }

    type t_props = {
        img: CarouselItemData | null | undefined;
        width_image_carousel: string;
        height_image_carousel: string;
        children: string | Snippet;
        is_flag_appear:boolean,
        is_story_appear:boolean
    };
   
    let { img, width_image_carousel,is_story_appear,is_flag_appear=false, height_image_carousel, children }: t_props = $props();

    let isError = $state(false);
    let isNetworkError = $state(false);
    let isMounted = $state(false);
    
    let src = $derived(img?.src || '');

    $effect(() => {
        if (src) {
            isError = false;
        } else {
            isError = true;
        }
        
        axios.get(src).then(data=>data.data).catch(err=>{
            const message_error_network=new RegExp("Network Error","i").test(err)
             isNetworkError=message_error_network
        })
    });

    onMount(() => {
        isMounted = true;
    });
</script>

<div class="w-full min-w-full shrink-0 flex flex-col">
    <div class="w-full relative overflow-hidden {height_image_carousel} bg-gray-200 rounded-xl">
        {#if isMounted && !isError&&!isNetworkError}
            <img 
                src={src} 
                alt="Carousel Item" 
                class="w-full h-full object-cover block"
            />
            {#if is_flag_appear}
            <img src="/palestine_flag.jpg" alt="" class="absolute bottom-0 left-0 z-40 rounded-full w-12.5 h-12.5">
            {/if}
        {:else}
            <div class="absolute inset-0 w-full h-full">
                <ImageSkeleton />
            </div>
        {/if}
    </div>
    {#if is_story_appear == true}
    <div class="flex flex-col gap-3 px-3 py-5">
        <div class="text-container">
            <h4>Story</h4>
        </div>
        <div class="flex gap-3 w-full flex-col">
            <p class="before:pb-2 before:w-full before:h-1 before:bg-white before:absolute before:bottom-0 before:left-0 before:content-[*]  before:pt-2 text-3xl">{img?.name || ''}</p>
            <p>{img?.story || ''}</p>
            <div class="btn-carities flex gap-2">
                {#if img?.links}
                    {#each img.links as btn_charity}
                        <a href={btn_charity.url} target="_blank" class="bg-emerald-700 text-white px-4 py-3 transition-all ease duration-500 rounded-3xl text-sm">
                            {btn_charity.name}
                        </a>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
{/if}
</div>