<script>
	export let socket;
	export let toggle;
	let positions = [...Array(11).keys()];
	let posDiff = 0;

	addEventListener("keydown", (event) => {
		let newPosDiff;

		switch (event.key) {
			case "a":
				newPosDiff = posDiff === 5 ? posDiff : posDiff + 1;
				socket.emit("ping", { newPosDiff });
				break;
			case "d":
				newPosDiff = posDiff === -5 ? posDiff : posDiff - 1;
				socket.emit("ping", { newPosDiff });
				break;
			default:
				break;
		}
	});

	socket.on("pong", ({ newPosDiff }) => {
		posDiff = newPosDiff;
	});

	socket.on("won", () => {
		console.log("jeet");
	});

	socket.on("lost", () => {
		console.log("haar");
	});
</script>

<div class="blocks">
	{#each positions as position (position)}
		<div
			class="block"
			style="background-color: {position === posDiff + 5 ? 'white' : 'transparent'};"
			on:click={() => {
				position === posDiff + 5 ? socket.emit("kill") : null;
			}}
		/>
	{/each}
</div>

<style>
	.blocks {
		width: 100%;
		height: 80vh;
		display: flex;
		gap: 16px;
	}

	.block {
		width: 100%;
		height: 30vh;
		display: flex;
	}
</style>
