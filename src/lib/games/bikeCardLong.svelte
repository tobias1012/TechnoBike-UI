<script lang="ts">
    export let name: String;
    export let watt: String;
    export let maxWatt: String;
    export let points: String
</script>

<div class="card">
    <header class="card-header"><h1 class="text-xl">{name}</h1></header> 
    <div>
        <p>Max Watt: </p> {maxWatt} <p>Watt: </p> {watt} <p>Points: </p> {points}
    </div>
</div>