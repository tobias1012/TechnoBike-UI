<script lang="ts">

</script>
<div class="fixed road-container">
    <div class="road">
        <div class="marquee"></div>
        <div class="marquee"></div>
        <div class="marquee"></div>
    </div>
    <div class="road-delay">
        <div class="marquee" ></div>
        <div class="marquee" ></div>
        <div class="marquee" ></div>

    </div>
</div>

<style lang="postcss">
    :global(body){
        margin: 0;
        padding: 0;
        background: rgb(145, 145, 145);
    }

    .fixed {
        position: fixed;
        width: 100vw;
        height: 100vh;

    }

    .road-container {
        z-index: -2;
    }

    .road {
        animation: marquee 10s linear infinite;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgb(145, 145, 145);
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
    }

    .road-delay {
        animation: marquee 10s linear 5s infinite;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgb(145, 145, 145);
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
    }
    
	.marquee {
        background-color: white;
        width: 50px;
        height: 250px;

	}


	@keyframes marquee {
		0% {
			transform: translatey(-100%);
		}
		100% {
			transform: translatey(100%);
		}
	}
</style>
