<script lang="ts">

    import { onMount } from 'svelte';
    
    let currentID = "not specified.";

    let name: string;

    onMount(() => {
        currentID = localStorage.getItem('id') ?? "not specified.";
    })

    function saveID() {
		localStorage.setItem('id', name)
        currentID = name;
    }

</script>

<!-- Email and Password Box -->
<form on:submit|preventDefault={saveID}>
    <p>Your current ID is {currentID}</p>
	<input bind:value={name} type="text" placeholder="Updated ID (from Aeacus)" class="input w-full max-w-xs " />

	<!-- Submit Button -->
	<input type="submit" value="Login" class="btn btn-primary my-4 w-full" />
</form>