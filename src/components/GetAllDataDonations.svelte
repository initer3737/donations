<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchDonationsData } from '../stores/donations_all_data';
    export const prerender = false;
    onMount(() => {
        // Cukup panggil fungsi ini sekali, store akan otomatis terisi dan memicu karosel bergerak!
        fetchDonationsData({});
    });
</script>