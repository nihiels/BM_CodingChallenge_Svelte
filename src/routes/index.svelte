<script lang="ts">
	import {getFromApi} from '../utils/api';

	//components
	import LoadingProgress from "../components/LoadingProgress.svelte";
	import Grid from "../components/Grid.svelte";
	import List from "../components/List.svelte";
	import Search from "../components/Search.svelte";


	//fake api calls, returning promises, executed here, as it's nicer to read in the html part

	//products
	let products:Array<object> = [];
	let filteredProds = undefined;
	const loadProducts = getFromApi().products();
	//catch error to prevent unhandled promise errors and log to browser console
	loadProducts.catch( er => console.error(er) );
	loadProducts.then(productsData => {
		products = productsData.edges.map(pEdge => pEdge.node)
	});

	//cart
	const loadCart = getFromApi().cart();
	let cartItems: { [key: string]: number} = {};
	loadCart.then(fakeCartData => {
		//make cartItems Dictionary => {sku:quantity}
		fakeCartData.products.map(cProd => cartItems[cProd.sku] = cProd.quantity);
	});
	loadCart.catch( er => console.error(er) );
	/*
		https://svelte.dev/tutorial/onmount
		I'm not sure, if it's better to use the onMount hook for loading data to prevent memory leaks,
		however, in this usage, it's not a leage, but with further routing, it shoud be tested...
	*/

	//window width for list/grid switch
	let innerWidth: number;

	// search handler
	let keyWord: string | undefined;
	const filterProds = ():void=>{
		if(keyWord === '' || keyWord === undefined){
			filteredProds = undefined; //assigns unfiltered prods to grid or list (products="{filteredProds || products}")
		}
		filteredProds = products.filter(p=>p.name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1);
	}

</script>

<!-- bind window resize event and get window inner width to toggle grid and list -->
<svelte:window bind:innerWidth />

<h1>Bringmeister coding challenge</h1>
<h6>Mastered by Nils</h6>

<Search bind:value="{keyWord}" on:search={filterProds} />

<!-- ATTENTION id-attributes are used for playwright E2E testing -->
{#await loadProducts}
	<div id="loading-info">
		<LoadingProgress />
	</div>

{:then _unused} <!-- sevelte variable is not necessary, as then handlers are taking care of the 'response' -->
	<h2 id="prods-headline">Products</h2>
	{#if innerWidth > 479} <!-- As the challange task was to switch to list, if bewlow 480... -->
		<Grid id="prodGrid" products="{filteredProds || products}" {cartItems} />
	{:else}
		<List id="prodList" products="{filteredProds || products}" {cartItems} />
	{/if}
{:catch _unused} <!-- In case the api is retuning an error (eg network issue) -->
	<p style="color: red">Produkte konnten nicht geladen werden</p>
{/await}






