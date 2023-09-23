<script lang="ts">
  import Card from "../../../components/Card.svelte";
  import { SERVER } from "$lib/vars.js";
  import { onMount } from "svelte";
    
  let levels: string[] = [];
  let secRemaining = -1;

  let loading = true;

  onMount(fetchLevels)

  async function fetchLevels () {
    fetch(SERVER + 'get_problems', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid: localStorage.getItem('id') })
      })
      .then(response =>
        response.json()
      )
      .then(data => {
        if (data.err) {
            alert(data.err)
            if (data.err.includes('time')) {
                window.location.pathname = '/start'
            } else {
                window.location.pathname = '/login'
            }
        } else if (data.problems) {
            levels = data.problems;

            if (data.seconds) {
                secRemaining = data.seconds + 1;
                updateSeconds();
            }
        } else {
            alert("Error occured")
        }
      })
      .catch(error => {
        console.log(error)
        alert("Error occured")
      })
      .finally(() => {
        loading = false;
      })
   }

   function updateSeconds() {
      if (secRemaining > 0) {
        secRemaining--;
        setTimeout(updateSeconds, 1000)
      }
   }

   function formatNum(num: number) {
      return Math.trunc(num).toString().padStart(2, '0')
   }
</script>

<style>
  .categories {
    margin-bottom: 20px;
  }

  .categories button {
    background-color: white;
    padding: 10px 15px;
    border-radius: 4px;
    margin-right: 10px;
    margin-bottom: 10px;
    border: none;
    color: green;
  }
</style>



<div class="flex flex-col w-screen h-full min-h-screen justify-start py-24 gap-10 bg-gray-600">
    {#if secRemaining >= 0}
    <div class="flex self-center w-96 md:w-1/2 gap-8 h-fit">
        <div class="flex flex-col self-center bg-gray-500 border-gray-600 border-2 rounded-lg shadow-xl w-full h-fit p-8 text-2xl text-center font-bold text-gray-300">
            <!-- Title for quiz -->
            <p>Time Remaining: {formatNum(secRemaining/3600)}:{formatNum((secRemaining % 3600)/60)}:{formatNum(secRemaining % 60)}</p>
        </div>
    </div>    
    {/if}
    <div class="flex flex-wrap gap-10 px-8">
        {#if loading} 
            <p>Loading...</p>
        {/if}
        {#each levels as level}
            <Card {level} />
        {/each}
    </div>
</div>

<!--
<div class="flex flex-wrap w-screen h-full min-h-screen py-24 px-8 gap-10 bg-gray-600">
  {#if secRemaining >= 0}
    <p>Count Down: {formatNum(secRemaining/3600)}:{formatNum((secRemaining % 3600)/60)}:{formatNum(secRemaining % 60)}</p>
  {/if}
  {#if loading} 
    <p>Loading...</p>
  {/if}
  {#each levels as level}
      <Card {level} />
  {/each}
</div>
-->