<script lang="ts">
    // props
    export let size: number | undefined = 175; // size can be a number or undefined, if undefined it will be 175
    export let fallbackSrc: string | undefined = `https://place-hold.it/${size}x${size}?text=Kein%20Bild%20gefunden&fontsize=10`;
    export let imageSrc: string | undefined = fallbackSrc;
    export const alt: string | undefined = 'Produktbild';
    // end props

    let src = imageSrc + '?imwidth='+size;
    const sizesList = [size*2,size, 240, 120]; /* retina and smaller thumbs*/

    // buid string for srcset based on sizesList
    // eg: size = 500: {url}?imwidth=1000 1000w, {url}?imwidth=500 500w, {url}?imwidth=240 240w, {url}?imwidth=120 120w
    let srcset = sizesList.map(size => `${imageSrc}?imwidth=${size} ${size}w`).join(', ');

    //Image load had an error, imgs src will get the fallbackSrc (eg. place-hold-it)
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
     sizes="(min-width: 768px) 175px, 120px"
     width="{size}" height="{size}">

<style>
    img{
        max-width: 100%; /* just to make sure, the image is not breaking any borders */
        height: auto;
    }
</style>