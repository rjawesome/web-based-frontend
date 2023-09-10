<script lang="ts">
	export let level: string;
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
      <h2 class="card-title">{level}</h2>
      <div class="card-actions justify-end">
        <a href="/frq/{level}" class="btn btn-primary">Go</a>
      </div>
    </div>
  </div>
