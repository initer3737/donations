
<script lang="ts">
import * as Card from "$lib/components/ui/card"
	import type { Snippet } from "svelte";
    // https://svelte.dev/tutorial/svelte/your-first-component
    // https://svelte.dev/tutorial/svelte/deep-state
    // https://svelte.dev/tutorial/svelte/if-blocks
    // https://inlang.com/m/gerre34r/library-inlang-paraglideJs/astro
type t_card={
    card_title:string,
    card_description:string,
    children:string|Snippet
}
const { 
    card_title,
    card_description,
    children 
}:t_card = $props();


"npx shadcn-svelte@latest add card"

</script>

<Card.Root class="w-50">
  <Card.Header>
    <Card.Title>{card_title}</Card.Title>
    <Card.Description>{card_description}</Card.Description>
  </Card.Header>
  <Card.Content>
    {#if typeof children === "function"}
        {@render children()}
    {:else if children}   
        {children}
    {/if}   
  </Card.Content>
</Card.Root>







