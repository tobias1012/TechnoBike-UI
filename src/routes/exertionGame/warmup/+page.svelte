<script lang="ts">
	import { redirect } from "@sveltejs/kit";
	import { tweened } from "svelte/motion";

    let time = 5*60; //Hvor lang tid skal det vare?
    let timer = tweened(time);
    setInterval(() => {
        if($timer == 0) redirect(300, "/exertionGame/maxWatt")
        if ($timer > 0) $timer--;
        
    }, 1000);

    const padWithZeroes = (number: Number) => number.toString().padStart(2, '0');

  $: minutes = Math.floor($timer / 60);
  $: seconds = padWithZeroes(Math.floor($timer - minutes * 60))
</script>

<div>
    <h1>Opvarming</h1>

    <h1 class="timer"><span class="minutes">{minutes}</span>:<span class="seconds">{seconds}</span></h1>
    <a href="/exertionGame/maxWatt" class="btn variant-filled-secondary text-center" data-sveltekit-preload-data="hover">(DEBUG) Skip</a>

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

    .timer {
        position: absolute;
        margin: 0;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        
        font-size: 10em;
    }
</style>