<script lang="ts">
import { SERVER } from "$lib/vars";
    import { onMount } from "svelte";

let items: any[] = []

onMount(() => {
    fetch(SERVER + 'leaderboard', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response =>
        response.json()
    )
    .then(data => {
        items = data.items;
    })
    .catch(err => {
        alert("Error getting leaderboard")
    })
})

</script>

<div class="flex px-8 py-24 bg-gray-600 h-screen w-screen">
    <div class="flex flex-col bg-gray-700 border-gray-800 border-2 rounded-lg shadow-xl w-96 md:w-1/2 h-fit p-8">
        <h1 class="text-white text-3xl font-bold mb-4">Leaderboard</h1>
        <table class="table-auto">
            <thead>
                <tr>
                    <th>Alias</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {#each items as item}
                    <tr>
                        <td>{item.alias}</td>
                        <td>{item.points}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    
</div>
