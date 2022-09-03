<script>
	import { io } from "socket.io-client";
	import { onMount } from "svelte/internal";

	let socket;

	onMount(() => {
		socket = io("http://localhost:5000", { transports: ["websocket"] });

		socket.on("connect", () => {
			console.log("connected");
		});

		socket.on("disconnect", () => {
			console.log("disconnected");
		});

		socket.on("success", ({ message }) => {
			console.log(message);
		});

		socket.on("failure", ({ message }) => {
			console.log(message);
		});
	});

	const createRoom = () => {
		socket.emit("createRoom", { userName: "Omkar", roomName: "allah12" });
	};

	const joinRoom = () => {
		socket.emit("joinRoom", { userName: "Omkar12", roomName: "allah12" });
	};
</script>

<main>
	<h1>Hello</h1>
	<button on:click={createRoom}>Create</button>
	<button on:click={joinRoom}>Join</button>
</main>

<style>
</style>
