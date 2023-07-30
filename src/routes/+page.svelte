<script lang="ts">
    import {invoke} from '@tauri-apps/api/tauri';
	import RoadBackground from "$lib/RoadBackground.svelte";
	import Biker from '$lib/Biker.svelte';
  let numBikes = 0;

  let bikes

  async function getNumBikes() {
    let newNumBikes: number = await invoke("get_num_bikes");
    if(newNumBikes == numBikes){
        return;
    }
    numBikes = newNumBikes;
  }

  let clear: number;
  $: {
    clearInterval(clear);
    clear = setInterval(getNumBikes, 500);
  }



</script>


<!--<div style="display: grid; grid-template-columns: repeat(2, 1fr); grid-gap: 50px;">-->
    <div class="grid grid-cols-2 gap-[50px]">
    <div class="grid grid-rows-auto grid-flow-row gap-20">
        <a href="/gpxGame" class="btn variant-filled-secondary" data-sveltekit-preload-data="hover">RaceMode</a>    
        <a href="/dataView" class="btn variant-filled-secondary" data-sveltekit-preload-data="hover">Data Viewer</a>
        <a href="/gpxGame" class="btn variant-filled-secondary" data-sveltekit-preload-data="hover">Under Construction</a>
        <a href="/exertionGame" class="btn variant-filled-secondary" data-sveltekit-preload-data="hover">The SoulSucker</a>
    </div>

    <div class="bikes">
      <h1 class="text-center text-xl font-bold"> Der er {numBikes} Cykler sluttet til!</h1>
      <div class="bikeContainer">
        {#key numBikes}
            {#each {length: numBikes} as asd, bike}
                <Biker />
            {/each} 
        {/key}
        </div>
    </div>
</div>
<RoadBackground />


<style>

  .menu {
      display: grid;
      grid-template-rows: auto;
      height: 96vh;
      grid-gap: 20px;
      margin-left: 20px;
      margin-top: 20px;
      margin-right: 20px;
      max-width: 50vh;
    }

    .bikeContainer {
        display: grid;
        margin-top: 50px;
        margin-left: 50px;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 50px;
    }
</style>
