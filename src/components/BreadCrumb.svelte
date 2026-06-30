<script lang="ts">
    type t_props={
        urls:Array<string>
    }

    const {urls}:t_props=$props()
</script>

<div class="breadcrumb flex gap-3 items-center cursor-pointer inline-block">
    {
        urls.join(">")
    }
</div>

