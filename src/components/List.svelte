<!--
    Inspired by the SMUI demo: https://sveltematerialui.com/demo/list/
-->

<script lang="ts">
    import ProductImage from "./ProductImage.svelte";
    import InCartBadgeButton from "./InCartBadge.svelte";
    import {numberToCurrency} from "../utils/toCurrency";

    export let products: Array<object>;
    export let cartItems: { [key: string]: number};
</script>
<div id={$$props.id}
     class={$$props.class}
     style={$$props.style}
>
    <ul>
        {#each products as product (product.sku)}
            <li class:in-cart="{cartItems[product.sku]}">
                {#if cartItems[product.sku]}
                    <InCartBadgeButton class="in-cart-badge" qty="{cartItems[product.sku]}" />
                {/if}
                <ProductImage size="{70}" max-height="{30}" class="product-image" imageSrc="{product.image}" />
                <div class="center">
                    <!-- class="product-name" is used in test -->
                    <div class="product-name">{product.name}</div>
                </div>
                <div class="right">
                    <div class="price">{numberToCurrency(product.prices.basePrice)}</div>
                    <div class="unit">{product.prices.baseUnit}</div>
                </div>
            </li>
        {/each}
    </ul>
</div>



<style>
    .in-cart{
        border-right: 1px solid red;
    }
    * :global(.product-image) {
        max-height: 50px;
        width: auto;
    }
    * :global(.right) {
        text-align: right;
        display: block;
        width: 30%;
    }
    * :global(.center) {
        text-align: left;
        padding-left: 20px;
        display: block;
        width: 100%;
    }
    * :global(.in-cart-badge) {
        position: absolute; top: 13px; left: 20px;
    }
</style>
