<script>
    import Navbar from "../../components/Navbar.svelte";

</script>
<Navbar />

<div class="flex flex-col justify-center h-screen w-screen bg-green-600">

	<div class=" bg-green-700 border-green-800 border-2 flex flex-col p-8 w-96 h-fit justify-around self-center rounded-lg gap-4 shadow-xl">

        <slot />

    </div>
</div>