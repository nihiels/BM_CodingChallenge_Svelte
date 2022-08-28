<!-- Simple badge component that expects a qty as number -->
<script lang="ts">
	export let qty: number;
</script>

<div class={$$props.class} style={$$props.style}>
	<div class="badge-qty" class:bigger={qty > 9}>{qty}</div>
</div>

<style lang="scss">
	@use '../styles/colors';
	.badge-qty {
		background-color: colors.$accent;
		color: colors.$darkBGfont;
		font-size: small;
		border-radius: 10px;
		display: flex;
		min-width: 20px;
		height: 20px;
		justify-content: center;
		align-items: center;
	}
	.bigger {
		padding: 0 7px; /* gets active for all quantities over 9 to make sure, the text has left and right buffer */
	}
</style>
