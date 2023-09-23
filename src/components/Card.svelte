<script lang="ts">
  import { SERVER } from "$lib/vars.js";
  import { onMount } from "svelte";

	export let level: {};
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
<div class="card w-96 bg-gray-700 shadow-xl border-gray-800 border-2">
    <div class="card-body">
      <h2 class="card-title">{level.name}</h2>
      <h2>Score: {level.points} of {level.availablePoints} pts</h2>
      <h2>Attempts Remaining: {level.attempts}</h2>
      <div class="card-actions justify-end">
        <a href="/challenges/{level.name}" class="btn btn-primary">Go</a>
      </div>
    </div>
  </div>
