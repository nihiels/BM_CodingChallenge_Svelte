<script lang="ts">
	import {getFromApi} from '../utils/api';

	//components
	import App from '../App.svelte';
	import LoadingProgress from '../components/LoadingProgress.svelte';
	import Grid from '../components/Grid.svelte';
	import List from '../components/List.svelte';
	import Search from '../components/Search.svelte';
	import ErrorMsg from '../components/ErrorMsg.svelte';

	// fake api calls, returning promises, executed here, as it's nicer to read in the html part
	// and I can extract relevant information

	// Products
	const requiredProdInfo = {
		name: String,
		prices: Array,
		sku: String,
		image: String
	};

	type Product = typeof requiredProdInfo;

	let products: Product[];
	let filteredProds: Product[] = undefined;
	const loadProducts = getFromApi().products();
	//catch error to prevent unhandled promise errors and log to browser console
	loadProducts.catch((er) => console.error(er));

	//usually I would define this in graphQL

	loadProducts.then((productsData) => {
		products = productsData.edges.map((pEdge) => {
			let prodInfos = {} as Product;
			//make sure, only required keys (defined in requiredProdInfo) is passed to components
			Object.keys(requiredProdInfo).map((prodKey) => (prodInfos[prodKey] = pEdge.node[prodKey]));
			return prodInfos;
		});
	});

	//cart
	const loadCart = getFromApi().cart();
	let cartItems: { [key: string]: number } = {};
	loadCart.then((fakeCartData) => {
		//make cartItems Dictionary => {sku:quantity}
		fakeCartData.products.map((cProd) => (cartItems[cProd.sku] = cProd.quantity));
	});
	loadCart.catch((er) => console.error(er));
	/*
		https://svelte.dev/tutorial/onmount
		I'm not sure, if it's better to use the onMount hook for loading data to prevent memory leaks,
		however, in this usage, it's not a leage, but with further routing, it shoud be tested...

		In this case, I decided, not to import onMount...
	*/

	//window width for list/grid switch
	let innerWidth: number;

	// search handler
	let keyWord: string | undefined;
	const filterProds = (): void => {
		if (keyWord === '' || keyWord === undefined) {
			filteredProds = undefined; //assigns unfiltered prods to grid or list (products="{filteredProds || products}")
		}
		// create filtered Products Array
		// p.name.toLowerCase() gave me a warning in my IDE (PHP-Storm), I guess, since p.name might not nbe a string
		filteredProds = products.filter(
			(p) => p.name.toString().toLowerCase().search(keyWord.toLowerCase()) !== -1
		);
	};
</script>

<!-- bind window resize event and get window inner width to toggle grid and list -->
<svelte:window bind:innerWidth />
<App>
	<h1>Bringmeister coding challenge</h1>
	<h6>Mastered by Nils</h6>

	<Search bind:value={keyWord} on:search={filterProds} />

	<!-- ATTENTION id-attributes are used for playwright E2E testing -->
	{#await loadProducts}
		<div id="loading-info">
			<LoadingProgress text="...loading products from fake api" />
		</div>
	{:then _unused}
		<!-- sevelte variable is not necessary, as then handlers are taking care of the 'response' -->
		<h2 id="prods-headline">Products</h2>
		{#if innerWidth > 479}
			<!-- -> the challange task was to switch to list, if bewlow 480... -->
			<Grid id="prodGrid" products={filteredProds || products} {cartItems} />
		{:else}
			<List id="prodList" products={filteredProds || products} {cartItems} />
		{/if}
	{:catch _unused}
		<!-- In case the api is returning an error (eg network issue) -->
		<ErrorMsg msg="Produkte konnten nicht geladen werden" />
	{/await}
</App>
