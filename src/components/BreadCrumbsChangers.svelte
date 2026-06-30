<script lang="ts">
import { onMount } from 'svelte';
import { data_bread_crumbs, data_set_bread_crumbs } from '@/stores/breadCrumbsData'

interface IProps{
    urls:Array<string>
}
const prop:IProps=$props();

onMount(()=>{
    data_set_bread_crumbs.set(['freepyat',...prop.urls])
})
</script>