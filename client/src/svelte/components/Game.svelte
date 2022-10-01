<script>
	let positions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
</script>

<div class="blocks">
	{#each positions as position (position)}
		<div class="block" />{/each}
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
		height: 40vh;
		display: flex;
		background-color: white;
	}
</style>
