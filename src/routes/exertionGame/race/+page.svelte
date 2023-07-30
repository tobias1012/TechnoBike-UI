<script lang="ts">
import BikeCardLong from "$lib/games/bikeCardLong.svelte";
import { invoke } from "@tauri-apps/api/tauri";


    interface bikedata {
        name: string;
        watt: string;
        weight: string;
    }
    let bikes: string;
    let bikesArr: Array<bikedata> = [];

    let gameData = {
        bikes: [
            {
            name: "",
            maxWatt: Number,
            watt: Number,
            percent: Number//(watt / maxWatt) * 100,

            }
        ]
    };

    async function getBikes() {
        let newBikes = await invoke("get_bikes");

        if (newBikes !== bikes) {
            bikes = newBikes;
            bikesArr = JSON.parse(bikes);
            console.log(bikesArr.length);
        }
    }


    setInterval(() => {
        getBikes();
    },500);
</script>

<div>
    <h1>CYKELRÆS!!</h1>
    <div class="bikedata">
        {#key bikes}
            
        
            {#each bikesArr as bike}
                <BikeCardLong name={bike.name} watt={bike.watt} maxWatt=300/>
            {/each}
        {/key}
    </div>
</div>