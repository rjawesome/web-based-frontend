<script lang="ts">
  import { SERVER } from "$lib/vars.js";
  import { onMount } from "svelte";

	export let level: string;
  let fetchedData: any;
  let loading = true;

  onMount(fetchScore)
  async function fetchScore () {
    fetch(SERVER + 'problem', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: level, uid: localStorage.getItem('id') })
    })
    .then(response =>
        response.json()
    )
    .then(data => {
        if (data.err) {
            alert(data.err);
            if (data.err.includes('user')) {
                window.location.pathname = '/login'
                return
            }
            if (data.err.includes('time')) {
                window.location.pathname = '/start'
                return
            }
        }
        else fetchedData = data;
    })
    .catch(error => {
        alert("Error Occurred!");
    })
    .finally(() => {
      loading = false;
    })
   }
</script>
<style>
	.category {
		color: #e8d125;
    border-radius: 15px;
    background: green;
    padding-right: 20px;
    display: inline-block;
    height: auto;
    width: fit-content;
    padding-left: 20px;
    padding: 10px;
	}
</style>
<div class="card w-96 bg-green-700 shadow-xl border-green-800 border-2">
    <div class="card-body">
      {#if !loading} 
        <h2 class="card-title">{level}</h2>
        <h2>Score: {fetchedData.points} of {fetchedData.avaliablePoints} pts</h2>
        <h2>Attempts Remaining: {fetchedData.attempts}</h2>
      {/if}
      <div class="card-actions justify-end">
        <a href="/challenges/{level}" class="btn btn-primary">Go</a>
      </div>
    </div>
  </div>
