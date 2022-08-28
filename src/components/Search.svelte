<!-- inspired from here: https://github.com/hperrin/svelte-material-ui/blob/master/packages/site/src/routes/demo/textfield/_Solo.svelte -->

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

        <input
                bind:value
                on:keydown={handleKeyDown}
                placeholder="Search"
                class="search-input"
        />
    </div>
    <button
            on:click={doSearch}
            class="search-fab"
    >
        >
    </button>
</div>




<style>
    .search-input-wrap {
        padding: 36px 18px;
        background-color: #f8f8f8;
        border: 1px solid rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    * :global(.paper) {
        display: flex;
        align-items: center;
        flex-grow: 1;
        max-width: 600px;
        margin: 0 12px;
        padding: 0 12px;
        height: 48px;
    }
    * :global(.paper *) {
        display: inline-block;
        margin: 0 12px;
    }
    * :global(.search-input) {
        flex-grow: 1;
        color: #000;
    }
    * :global(.search-input::placeholder) {
        color: #000;
        opacity: 0.6;
    }
    * :global(.search-fab) {
        flex-shrink: 0;
    }
</style>
