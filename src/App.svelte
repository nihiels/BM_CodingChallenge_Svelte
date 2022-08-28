<slot />

<!-- App wrap to use global declaration like app wide styles
 inspired by this reddit user: https://www.reddit.com/r/sveltejs/comments/si08mv/comment/i7o1xx8/?utm_source=share&utm_medium=web2x&context=3

 Would like to know more about this:
 https://kit.svelte.dev/docs/routing
 But the documentation left the question open, how to make this + prefix featuire to work

 -->
<style lang="scss" global>
	@use 'styles/global';
</style>
