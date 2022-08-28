<!--
    Expects just an optional text, so far...
    got the SVG from here: https://codepen.io/aleksander351/pen/KzgKPo -->
<script lang="ts">
	export let text: string | undefined;
</script>

<div class="progress-wrapper">
	{#if text}
		<p>{text}</p>
	{/if}
	<svg class="circular-loader" viewBox="25 25 50 50">
		<circle
			class="loader-path"
			cx="50"
			cy="50"
			r="20"
			fill="none"
			stroke="colors.$accent"
			stroke-width="2"
		/>
	</svg>
</div>

<style lang="scss">
	@use '../styles/colors';

	.progress-wrapper {
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
	}

	.circular-loader {
		-webkit-animation: rotate 2s linear infinite;
		animation: rotate 2s linear infinite;
		height: 50px;
		-webkit-transform-origin: center center;
		-ms-transform-origin: center center;
		transform-origin: center center;
		width: 50px;
	}

	.loader-path {
		stroke-dasharray: 150, 200;
		stroke-dashoffset: -10;
		-webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
		animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
		stroke-linecap: round;
	}

	@-webkit-keyframes rotate {
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	@keyframes rotate {
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	@-webkit-keyframes dash {
		0% {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 89, 200;
			stroke-dashoffset: -35;
		}
		100% {
			stroke-dasharray: 89, 200;
			stroke-dashoffset: -124;
		}
	}
	@keyframes dash {
		0% {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 89, 200;
			stroke-dashoffset: -35;
		}
		100% {
			stroke-dasharray: 89, 200;
			stroke-dashoffset: -124;
		}
	}
	@-webkit-keyframes color {
		0% {
			stroke: colors.$accent;
		}
		40% {
			stroke: colors.$accent;
		}
		66% {
			stroke: colors.$accent;
		}
		80%,
		90% {
			stroke: colors.$accent;
		}
	}
	@keyframes color {
		0% {
			stroke: colors.$accent;
		}
		40% {
			stroke: colors.$accent;
		}
		66% {
			stroke: colors.$accent;
		}
		80%,
		90% {
			stroke: colors.$accent;
		}
	}
</style>
