<script lang="ts">
	import { getFromApi } from '../utils/api';
</script>

<h1>Bringmeister coding challenge</h1>
<h2>Cart</h2>
{#await getFromApi().cart() then cartData}
	<pre>{JSON.stringify(cartData.products.length, null, 4)}</pre>
{/await}

<h2>Product</h2>
{#await getFromApi().products() then productsData}
	<pre>{JSON.stringify(productsData.pageInfo.totalCount, null, 4)}</pre>
{/await}
