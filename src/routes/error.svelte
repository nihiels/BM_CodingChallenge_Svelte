<!--
    error page for test error component as it's used by the loadProduct catch block in the index file the same way.
    I have no idea how to test this...
 -->
<script lang="ts">
    import ErrorMsg from '../components/ErrorMsg.svelte';
</script>

<ErrorMsg msg="öäü!'§$%&/>()=?\" />
