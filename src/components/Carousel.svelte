<script lang="ts">
	import type { t_images_carousel } from '@/types/t_images_carousel';
	import { type Snippet } from 'svelte';
	import CarouselItem from './CarouselItem.svelte';
    
    type t_props={
        duration_carousel:number,
        width_image_carousel:string,
        height_image_carousel:string,
        is_flag_appear:boolean,
        children:string|Snippet,
        [prop_name:string]:any
        images:Array<ImageMetadata|t_images_carousel>
    }
    const {
        duration_carousel=3000,
        width_image_carousel="w-full",
        height_image_carousel="h-64 md:h-96",
        children,
        images=[],
        is_flag_appear,
        is_story_appear
    }:t_props=$props()
    let currentIndex=$state(0)
    let interval:any
    $effect(() => {
        if (interval) clearInterval(interval)
        if (images.length > 0) {
            if (isNaN(currentIndex) || currentIndex >= images.length) {
                currentIndex = 0;
            }
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length
            }, duration_carousel);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    })
</script>

<div class="{width_image_carousel} overflow-hidden block">
    <div 
        class="flex! flex-row! w-full flex-nowrap scroll-smooth transition-transform duration-500 ease-in-out" 
        style="transform: translateX(-{currentIndex * 100}%);"
    >
        {#each images as img}
            <CarouselItem {is_story_appear} {is_flag_appear} {children} {height_image_carousel} {img} {width_image_carousel}></CarouselItem>
        {/each}
    </div>
</div>