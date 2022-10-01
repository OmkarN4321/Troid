<script>
	import { push } from "svelte-spa-router";

	export let socket;
	let userName = null;
	let roomName = null;
	let error = null;

	const createRoom = () => {
		userName && roomName
			? socket.emit("createRoom", { userName, roomName })
			: (error = { status: "failure", message: "All fields are required" });
	};

	const joinRoom = () => {
		userName && roomName
			? socket.emit("joinRoom", { userName, roomName })
			: (error = { status: "failure", message: "All fields are required" });
	};

	socket.on("success", () => {
		push("/game");
	});

	socket.on("failure", ({ message }) => {
		error = { status: "failure", message };
	});
</script>

<main class="home-page">
	<div class="container">
		<h1 class="heading">Troid</h1>

		<div class="inputs">
			<input
				type="text"
				bind:value={userName}
				name="userName"
				class="input"
				placeholder="USERNAME"
			/>
			<input
				type="text"
				bind:value={roomName}
				name="roomName"
				class="input"
				placeholder="ROOMNAME"
			/>
		</div>

		<div class="buttons">
			<button class="primary-button" on:click={createRoom}>Create room</button>
			<button class="primary-button" on:click={joinRoom}>Join room</button>
		</div>
	</div>

	{#if error}
		<div
			class="errors"
			style="background-color: {error.status === 'success' ? '#8befdf' : '#500012'};"
		>
			<p class="error">{error.message}</p>
		</div>
	{/if}
</main>

<style>
	.home-page {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
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

	.container {
		width: 300px;
		padding: 16px;
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 48px;
		border-radius: 8px;
		background-color: #363636;
	}

	.heading {
		font-size: 40px;
		font-weight: 800;
		color: #38e1c6;
	}

	.inputs {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.inputs .input {
		width: 100%;
		height: 40px;
		padding: 4px 8px;
		border: 1px solid #8befdf;
		border-radius: 4px;
		color: #eeeeee;
		font-size: 16px;
		background-color: inherit;
	}

	.errors {
		width: 300px;
		height: 40px;
		padding: 4px 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 4px;
	}

	.buttons {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.primary-button {
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		border: 1px solid #8befdf;
		border-radius: 4px;
		background-color: #004339;
	}

	.primary-button:hover {
		transform: scale(1.05);
		transition: all 0.15s ease-in-out;
	}
</style>
