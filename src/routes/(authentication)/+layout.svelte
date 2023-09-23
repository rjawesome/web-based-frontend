<script>
    import Navbar from "../../components/Navbar.svelte";

</script>
<Navbar />

<div class="flex flex-col justify-center h-screen w-screen bg-gray-600">

	<div class=" bg-gray-700 border-gray-800 border-2 flex flex-col p-8 w-96 h-fit justify-around self-center rounded-lg gap-4 shadow-xl">

        <slot />

    </div>
</div>