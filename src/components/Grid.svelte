<!-- CSS Grid inspired by Jen Simmons -> https://codepen.io/jensimmons/pen/LyrNqJ?editors=1100
     min and max tiles inspired from here:
     https://stackoverflow.com/questions/71784327/is-it-possible-to-use-a-fixed-min-and-max-width-for-columns-in-a-css-grid-which
     https://jsfiddle.net/7exd5hom/ -->
<script lang="ts">
    import InCartBadgeButton from "./InCartBadge.svelte";
    import ProductImage from "./ProductImage.svelte";
    import {numberToCurrency} from "../utils/toCurrency";

    export let products: Array<object>;
    export let cartItems: { [key: string]: number };
</script>


<div    id={$$props.id}
        class={$$props.class + ' gridContainer'}
        style={$$props.style}
    >
    {#each products as product (product.sku)}
        <div class="grid-tile" class:in-cart="{cartItems[product.sku]}">
            <div class="product-wrap">
                <div class="product-name">{product.name}</div>
                <ProductImage size="{500}" class="product-image" imageSrc="{product.image}"/>
                {#if cartItems[product.sku]}
                    <InCartBadgeButton button class="in-cart-badge" qty="{cartItems[product.sku]}"/>
                {/if}
            </div>
            <div class="bottom-bar">
                <div class="unit">{product.prices.baseUnit}</div>
                <div class="price">{numberToCurrency(product.prices.basePrice)}</div>
            </div>
        </div>
    {/each}
</div>

<style lang="scss">

  $bottomBarHeight: 30px;
  $minTileWidth: 300px;
  $maxTileWidth: 400px;
  $tileBorderColor: rgba( 155, 189, 66, 1);
  $inCartColor: rgba(239, 12, 55, 1);

  .gridContainer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax($minTileWidth, max-content));
    /* makes sure that tiles have a min
    width of 300px, as the grid-tile class
    has max-width: 100% */

    gap: 10px;
    justify-items: center;
    justify-content: center;
  }

  .grid-tile {
    width: $maxTileWidth;
    max-width: 100%; /* will shrink to min width of grid column definition */
    border: 2px solid $tileBorderColor;
    padding-bottom: $bottomBarHeight; /* space for bottom-bar */
    position: relative; /* to make position absolute work for bottom-bar (unit and price view) */
  }

  .grid-tile.in-cart {
    border-color: $inCartColor;
  }

  .product-wrap {
    margin: 10px; /* inner tile spacing */
    position: relative; /* InCartBadgeButton positioning  */
    height: 100%; /* InCartBadgeButton always at bottom, no matter the img height */
  }

  .bottom-bar {
    position: absolute;
    bottom: 0;
    height: $bottomBarHeight;
    background-color: $tileBorderColor;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .grid-tile.in-cart .bottom-bar {
    background-color: $inCartColor;
  }

  .bottom-bar div {
    padding: 5px;
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