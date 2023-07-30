<script lang="ts">
	import { invoke } from "@tauri-apps/api/tauri";
    let players = 0;
    
    async function getNumBikes() {
    players = await invoke("get_num_bikes");
    }

    let clear: number;
    $: {
        clearInterval(clear);
        clear = setInterval(getNumBikes, 500);
    }
</script>

<div>
    <h1>The Exertion Game!</h1> <br />
    <h1>Der er {players} spillere tilsluttet</h1>


    <a href="/exertionGame/warmup" class="btn variant-filled-secondary text-center" data-sveltekit-preload-data="hover">Start Spillet!</a>
</div>
<style>
    div {
        margin-top: 100px;
    }

    h1 {
        text-align: center;
        font-weight: bold;
        font-size: 2em;
    }
</style>