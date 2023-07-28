<div class = "bike">            transform: translatex(5%);

    <p>Name</p>
    <div class = "bike-sprite">

    </div>

</div>

<style lang="postcss">
    .bike {
        animation: shake 2s linear infinite;
        
    }
    .bike-sprite {
        background-color: blue;
        height: 50px;
        width: 50px;
    }

    @keyframes shake {
		0% {
			transform: translatex(0%);
		}
		33% {
			transform: translatex(-5%);
		}
        66% {
            transform: translatex(0%);
        }
        100% {
            transform: translatex(5%);

        }
    }

</style>