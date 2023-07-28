<script lang="ts">
	import RoadBackground from "$lib/RoadBackground.svelte";
  let numBikes = 0;
</script>


<div style="display: grid; grid-template-columns: repeat(2, 1fr); grid-gap: 50px;">
    <div class="menu">
      <button>DataView</button>
    </div>

    <div class="bikes">
      <h1 class="bikeTitle"> Der er {numBikes} Cykler sluttet til!</h1>

    </div>
</div>
<RoadBackground />


<style>
  .menu {
      display: grid;
      grid-template-rows: auto;
      grid-gap: 50px;
    }

  .bikeTitle {
      font-size: 100%;
      text-align: center;
    }
</style>
