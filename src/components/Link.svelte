<script lang="ts">
    export let href = ''
    export let title: string | undefined = undefined
</script>

<style>
    a {
        text-decoration: underline !important;
    }
</style>

<a {href} {title} target='_blank' rel='noopener'><slot></slot></a>