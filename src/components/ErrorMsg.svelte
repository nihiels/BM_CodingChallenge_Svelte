<script lang="ts">
	export let msg =
		'Ups, da ging wohl was schief. Bitte laden Sie die Seite neu und versuchen Sie es erneut oder fragen Sie Ihren Arzt oder Apotheker.';
</script>

<!-- id is used in test -->
<p class="error" id="error-msg">{msg}</p>

<style lang="scss">
	@use '../styles/colors';
	.error {
		color: colors.$accent;
	}
</style>
