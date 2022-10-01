<script>
	export let socket;
	export let toggle;
	let counter = false;
	let count = 5;

	$: {
		if (counter && count === 5) {
			const id = setInterval(() => {
				if (count === 0) {
					toggle();
					clearInterval(id);
				} else {
					count = count - 1;
				}
			}, 1000);
		}
	}

	socket.on("gameOn", () => {
		counter = true;
	});
</script>

<div class="info-container">
	{#if counter}
		<p class="info">Game starts in</p>
		<p class="countdown">{count}</p>
	{:else}
		<p class="info">Initalizing the game</p>
	{/if}
</div>

<style>
	.info-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.info {
		font-size: 40px;
		font-weight: 400;
	}

	.countdown {
		font-size: 40px;
		font-weight: 800;
	}
</style>
