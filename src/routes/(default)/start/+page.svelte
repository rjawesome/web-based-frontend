<script lang="ts">
    import { SERVER } from "$lib/vars.js"
    import { onMount } from "svelte"

    let uid: string | null;

    onMount(() => {
        uid = localStorage.getItem("id")
    })

    let disabled = false;

    function startCompetition() {
        disabled = true;

        if (!uid) {
            alert("Not logged in!")
            disabled = false;
            window.location.pathname = '/login'
            return
        }

        fetch(SERVER + 'start', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uid })
        })
        .then(response =>
            response.json()
        )
        .then(data => {
            if (data.err) {
                alert(data.err);
            }
            else {
                alert("Your time has started. You have 4 hours remaining.")
                window.location.pathname = '/challenges'
            }
        })
        .catch(error => {
            alert("Error Occurred!");
        })
        .finally(() => {
            disabled = false;
        })
    }

</script>

<div class="flex px-8 py-24 bg-gray-600 h-screen w-screen">
<button disabled={disabled} on:click={startCompetition} class="btn btn-primary">Start Now/Check Time!</button>
</div>