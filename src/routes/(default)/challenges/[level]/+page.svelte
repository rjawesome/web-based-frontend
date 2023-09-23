<script lang="ts" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/highlight.min.js">
    /** @type {import('./$types').PageData} */
    import SvelteMarkdown from 'svelte-markdown';
    import { onMount } from 'svelte';
    import { SERVER } from '$lib/vars.js';

    import Code from '../../../../components/Code.svelte';
    import Link from '../../../../components/Link.svelte';

    export let data: any;
    let fetchedData: any;
    let code: string;
    let uid: string | null = null;

    let disabled = false;

    onMount(() => {
        uid = localStorage.getItem('id')
        if (uid == null) {
            alert("Not logged in!")
            window.location.pathname = '/login'
            return
        }

        fetch(SERVER + 'problem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: data.id, uid })
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
    })

    async function RunCode() {
        if (uid == null) {
            alert("Not logged in!")
        }

        disabled = true;

        fetch(SERVER + 'submit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: data.id, csv: code, uid })
        })
        .then(response =>
            response.json()
        )
        .then(data => {
            if (data.err) alert(data.err);
            else if (data.msg) {
                if (data.points) fetchedData = { ...fetchedData, points: data.points }
                if (data.attempts) fetchedData = { ...fetchedData, attempts: data.attempts }

                alert(data.msg);
            }
            else alert("Error Occurred!");
        })
        .catch(error => {
            alert("Error Occurred!");
        })
        .finally(() => {
            disabled = false;
        })
    }


</script>

<div class="flex flex-col w-screen h-full justify-start py-24 gap-10 bg-gray-600">
    {#if fetchedData}
        <div class="flex self-center w-96 md:w-1/2 gap-8 h-fit">
            <div class="flex flex-col self-center bg-gray-300 border-gray-600 border-2 rounded-lg shadow-xl w-full h-fit p-8 text-2xl text-center font-bold text-gray-600">
                <!-- Title for quiz -->
                <p>{data.id}</p>
            </div>
        </div>

        <div class="flex flex-col bg-gray-700 border-gray-800 border-2 rounded-lg shadow-xl w-96 md:w-1/2 h-fit self-center p-8">
            <!-- Question for quiz -->
            <SvelteMarkdown source={fetchedData.text} renderers={{ code: Code, link: Link }} />
            <p>Current Points: {fetchedData.points}</p>
            <p>Attempts remaining: {fetchedData.attempts}</p>
            <p>Available Points: {fetchedData.availablePoints}</p>
        </div>

        <div class="flex flex-col bg-gray-700 border-gray-800 border-2 rounded-lg shadow-xl w-96 md:w-1/2 h-96 self-center p-8 justify-center gap-8">
            <textarea bind:value={code} class="textarea w-full h-full" placeholder="Enter your CSV here..." id="codingArea"></textarea>
            <input disabled={disabled} type="submit" on:click={RunCode} value="Run" class="btn btn-primary" />
        </div>
    {:else}
        <div class="flex self-center w-96 md:w-1/2 gap-8 h-fit">
            <div class="flex flex-col self-center bg-gray-300 border-gray-600 border-2 rounded-lg shadow-xl w-full h-fit p-8 text-2xl text-center font-bold text-gray-600">
                <!-- Title for quiz -->
                <p>Loading</p>
            </div>
        </div>
    {/if}
</div>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/default.min.css">
<style>
    .textarea {
        background-color: #333;
        color: #fff;
        border: 1px solid #333;
        padding: 8px;
        font-size: 14px;
        caret-color: #fff;
    }

    .btn {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 8px 16px;
        font-size: 16px;
        cursor: pointer;
    }
</style>