<!-- inspired from here: https://github.com/hperrin/svelte-material-ui/blob/master/packages/site/src/routes/demo/textfield/_Solo.svelte

    This component has a two way binding to make the search input available on the parrent
    it fires a search event when pressing enter in the input field or klicking the button

-->
<script lang="ts">
	// make search component able to dispatch an event to it's parent, when a search is to be performed
	import {createEventDispatcher} from 'svelte';

	const dispatch = createEventDispatcher();

	// define value as prop for two way binding
	export let value = '';

	function doSearch() {
		//send event to parent
		dispatch('search');
	}

	function handleKeyDown(event: CustomEvent | KeyboardEvent) {
		event = event as KeyboardEvent;
		if (event.key === 'Enter') {
			doSearch();
		}
	}
</script>

<div class="search-input-wrap">
	<div class="paper">
		<!-- id="search-input"  is used in test -->
		<input
			bind:value
			on:keydown={handleKeyDown}
			placeholder="Search"
			class="search-input"
			id="search-input"
		/>

		<button id="search-btn" on:click={doSearch}>
			<!-- id="search-btn" is used in test -->
			>
		</button>
	</div>
</div>

<style lang="scss">
	@use '../styles/colors';
	.search-input-wrap {
		padding: 20px 18px;
		background-color: colors.$primary;
		border: 1px solid colors.$borderColor;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.paper {
		display: flex;
		align-items: center;
		flex-grow: 1;
		max-width: 600px;
		margin: 0 12px;
		padding: 0 12px;
		height: 48px;
	}
	.paper * {
		display: inline-block;
		margin: 0 12px;
	}
	.search-input {
		flex-grow: 1;
		color: colors.$bodyText;
	}
	.search-input::placeholder {
		color: colors.$bodyText;
		opacity: 0.6;
	}
	button {
		flex-shrink: 0;
	}
</style>
