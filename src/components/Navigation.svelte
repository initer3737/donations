<script lang="ts">
import { data_bread_crumbs, data_set_bread_crumbs } from '@/stores/breadCrumbsData'
import BreadCrumb from '../components/BreadCrumb.svelte'
	import { onMount } from 'svelte';
"before:w-[calc(2*100%)] before:h-2 hover:before:bg-amber-300 before:block before:relative before:top-11 relative"
const urls=[
    {href:"/",link:"home"},
    {href:"/donations",link:"donations"},
    {href:"/",link:"faq"},
]
onMount(()=>{
    data_set_bread_crumbs.set(['freepyat','home'])
})
const urlBreadCrumbs:Array<string>=$derived($data_set_bread_crumbs)
</script>
<nav class="flex flex-gap-3 items-end ">
    <div class="logo">
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img src="/donate.png" alt="donation image" class="w-[5.45rem]" />
    </div>
    <section class="w-full overflow-x-hidden">
        <div class="links-main flex justify-around px-5 gap-3 text-3xl transition-all duration-300 ease-in">
            {#each urls as url,idx}
                <a href={url.href} class={`before:transition-all before:duration-500 before:ease before:w-(--lebar-custom) before:h-2 hover:before:bg-blue-300 before:block before:relative before:top-11 relative before:left-1/2 before:-translate-x-1/2 inline-block`}
                    style={`--lebar-custom: calc(${idx + 2} * 100%)`}
                >{url.link}</a>
            {/each}
        </div>
        <div class="breadcrumbs  bg-slate-200  p-2">
            <BreadCrumb urls={urlBreadCrumbs}></BreadCrumb>
        </div>
    </section>
</nav>

