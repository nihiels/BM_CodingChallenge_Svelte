<!--
    Image loader that provides a fallback image incase the image was not available or can't be used:
     https://developer.mozilla.org/en-US/docs/Web/API/Element/error_event

     it expects a size and will create a srcset for different devices

     the sizes map is not really usefull yet, as it's just saying, that doubled size should be used.
     Actually for this component it doesn't play a role, I guess.

     -->
<script lang="ts">
	export let size: number | undefined = 175; // size can be a number or undefined, if undefined it will be 175
	export let placeholderText: string | undefined = '+#?';
	let fallbackSrc:
		| string
		| undefined = `https://via.placeholder.com/${size}x${size}/FFFFFF/be1313/?text=${encodeURIComponent(
		placeholderText
	)}&fontsize=30`;
	export let imageSrc: string | undefined = fallbackSrc;
	export const alt: string | undefined = 'Produktbild';

	let src = imageSrc + '?imwidth=' + size;
	const sizesList = [size * 2, size, 240, 120]; /* retina and smaller thumbs*/

	// buid string for srcset based on sizesList
	// eg: size = 500: {url}?imwidth=1000 1000w, {url}?imwidth=500 500w, {url}?imwidth=240 240w, {url}?imwidth=120 120w
	let srcset = sizesList.map((size) => `${imageSrc}?imwidth=${size} ${size}w`).join(', ');

	//Image load had an error, imgs src will get the fallbackSrc (https://via.placeholder.com)
	const handleError = () => {
		src = fallbackSrc;
		srcset = '';
	};
</script>

<img
	class={$$props.class}
	style={$$props.style}
	on:error={handleError}
	{src}
	{srcset}
	{alt}
	sizes="{size * 2}px"
	width={size}
	height={size}
/>

<style>
	img {
		max-width: 100%; /* just to make sure, the image is not breaking any borders */
		height: auto;
	}
</style>
