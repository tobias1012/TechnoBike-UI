<script lang="ts">
	import { invoke } from "@tauri-apps/api/tauri";

    let bikes: String;
    let bikesArr: Array<String>;

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
        bikes = await invoke("get_bikes");
        bikesArr = bikes.split("},");
        console.log(bikesArr);
    }


    setInterval(() => {
        getBikes();
    },500);
</script>

<div>
    <h1>CYKELRÆS!!</h1>
    <div class="bikedata">
            {bikes}
    </div>
</div>