<main class="game-page">
	<div class="game-zone">
		<div class="info">
			<p>The page you are looking for wasn't found</p>
		</div>
	</div>
</main>

<style>
	.game-page {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #000000;
		background-image: linear-gradient(
				180deg,
				rgba(0, 0, 0, 1) 0%,
				rgba(0, 0, 0, 0.7) 30%,
				rgba(0, 0, 0, 0.7) 70%,
				rgba(0, 0, 0, 1) 100%
			),
			url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='150' height='150' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(90)'%3E%3Crect width='100%25' height='100%25' fill='rgba(0, 0, 0,1)'/%3E%3Cpath d='M-0.5 20v20h1v-20zM39.5 20v20h1v-20z' fill='rgba(255, 255, 255,0.6)'/%3E%3Cpath d='M-10 29.5 h60 v1 h-60z' fill='rgba(255, 255, 255,0.6)'/%3E%3Cpath d='M19.5 0v40h1v-40z' fill='rgba(255, 255, 255,0.6)'/%3E%3Cpath d='M-10 9.5h60v1h-60z' fill='rgba(255, 255, 255,0.6)'/%3E%3Cpath d='M-0.5 0v20h1v-20zM39.5 0v20h1v-20z' fill='rgba(255, 255, 255,0.6)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E ");
	}

	.game-zone {
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.info p {
		font-size: 40px;
		font-weight: 400;
	}
</style>
