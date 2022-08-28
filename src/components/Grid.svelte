<!--This Grid expects products and cart items to render for bigger screen sizes

    CSS Grid inspired by Jen Simmons -> https://codepen.io/jensimmons/pen/LyrNqJ?editors=1100
    min and max tiles inspired from here:
    https://stackoverflow.com/questions/71784327/is-it-possible-to-use-a-fixed-min-and-max-width-for-columns-in-a-css-grid-which
    https://jsfiddle.net/7exd5hom/ -->
<script lang="ts">
	import InCartBadgeButton from './InCartBadge.svelte';
	import ProductImage from './ProductImage.svelte';
	import toCurrency from '../utils/toCurrency';

	export let products: Array<object>;
	export let cartItems: { [key: string]: number };
</script>

<div id={$$props.id} class={$$props.class + ' gridContainer'} style={$$props.style}>
	{#each products as product (product.sku)}
		<a
			id={product.sku}
			href="#{product.sku}"
			class="grid-tile"
			class:in-cart={cartItems[product.sku]}
		>
			<div class="product-wrap">
				<div class="product-name">{product.name}</div>
				<ProductImage
					size={250}
					alt={product.name}
					class="product-image"
					imageSrc={product.image}
				/>
			</div>
			<div class="prod-props">
				{#if cartItems[product.sku]}
					<InCartBadgeButton button class="in-cart-badge" qty={cartItems[product.sku]} />
				{/if}
				<div class="unit">{product.prices.baseUnit}</div>
				<div class="price">{toCurrency(product.prices.basePrice)}</div>
			</div>
		</a>
	{/each}
</div>

<style lang="scss">
	@use '../styles/colors';

	$minTileWidth: 300px;
	$maxTileWidth: 400px;
	$gridGap: 10px;

	.gridContainer {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax($minTileWidth, max-content));
		/* makes sure that tiles have a min
    width of 300px, as the grid-tile class
    has max-width: 100% */

		gap: $gridGap;
		justify-items: center;
		justify-content: center;
	}

	.grid-tile {
		width: $maxTileWidth;
		max-width: 100%; /* will shrink to min width of grid column definition */
		border: 1px solid colors.$primary;
		position: relative; /* to make position absolute work for inCart badge */
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 0;
	}

	/* in cart effect */
	.grid-tile.in-cart {
		box-shadow: 2px 3px 5px 2px #8a8a8a;
	}

	.product-wrap {
		margin: 10px; /* inner tile spacing */
		position: relative; /* InCartBadgeButton positioning  */
		display: flex;
		flex-direction: column;
		align-items: center;
		align-content: center;
	}

	.prod-props {
		width: 100%;
		display: flex;
		justify-content: space-between;
		color: colors.$lightText;
	}

	.prod-props div {
		padding: 10px;
	}

	.product-name {
		font-size: 14px;
		font-weight: bold;
		padding-bottom: 15px;
	}

	* :global(.in-cart-badge) {
		position: absolute;
		bottom: 30px;
		right: 10px;
	}
</style>
