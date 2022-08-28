<!--
    Inspired by https://getbootstrap.com/docs/5.2/examples/list-groups/

    This list expects products and cart items to render them as a mobile optimized list
-->
<script lang="ts">
	import ProductImage from './ProductImage.svelte';
	import InCartBadgeButton from './InCartBadge.svelte';
	import toCurrency from '../utils/toCurrency';

	export let products: Array<object>;
	export let cartItems: { [key: string]: number };
</script>

<div id={$$props.id} class={$$props.class} style={$$props.style}>
	<div class="list-group">
		{#each products as product (product.sku)}
			<a
				href="#{product.sku}"
				id={product.sku}
				class:in-cart={cartItems[product.sku]}
				class="list-group-item flex"
			>
				{#if cartItems[product.sku]}
					<InCartBadgeButton class="in-cart-badge" qty={cartItems[product.sku]} />
				{/if}
				<ProductImage
					size={140}
					max-height={60}
					alt={product.name}
					class="product-image"
					imageSrc={product.image}
				/>
				<div class="list-item-content flex">
					<!-- class="product-name", price and unit is used in test -->
					<div class="product-name">{product.name}</div>
					<div class="nowrap prod-props flex">
						<div class="unit">{product.prices.baseUnit}</div>
						<div class="price">{toCurrency(product.prices.basePrice)}</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '../styles/colors';

	.list-group {
		width: 100%;
	}

	.flex {
		display: flex;
	}

	.nowrap {
		white-space: nowrap;
	}

	.prod-props {
		color: colors.$lightText;
		text-align: right;
		justify-content: end;
		flex-direction: column;
	}

	.list-group-item {
		gap: 10px;
		padding: 5px;
		border-bottom: 1px solid colors.$primary;
		position: relative;
	}

	.list-item-content {
		justify-content: space-between;
		gap: 5px;
		width: 100%;
	}

	.in-cart {
		border-right: 5px solid colors.$accent;
	}

	* :global(.product-image) {
		max-height: 50px;
		width: auto;
	}

	* :global(.in-cart-badge) {
		position: absolute;
		top: 3px;
		left: 4px;
	}
</style>
