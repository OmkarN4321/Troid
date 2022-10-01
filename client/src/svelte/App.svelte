<script>
	import { io } from "socket.io-client";
	import Router from "svelte-spa-router";
	import { wrap } from "svelte-spa-router/wrap";
	import HomePage from "./pages/HomePage.svelte";
	import GamePage from "./pages/GamePage.svelte";
	import NotFoundPage from "./pages/NotFoundPage.svelte";

	const socket = io("http://localhost:5000", { transports: ["websocket"] });
	const routes = {
		"/": wrap({
			component: HomePage,
			props: {
				socket,
			},
		}),
		"/game": wrap({
			component: GamePage,
			props: {
				socket,
			},
		}),
		"*": wrap({
			component: NotFoundPage,
		}),
	};
</script>

<Router {routes} />

<style>
</style>
