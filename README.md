# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Run the project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# install dependencies
npm install

# start local development version
npm run dev

# or start the server and open the app in a new browser tab, project should be available on http://localhost:5173 in your browser
npm run dev -- --open

```

I also added a fake API - `getFromApi` for retrieving fake cart and products data. See example in index.svelte for usage. Both include a delay to simulate network loading.

## Work to do

Adjust the `/routes/index.svelte` create necessary files in the `components` folder to:

- Display a loading info while the products are in loading state

- Change `index.svelte` to display a tile for each product with the following infos:

  - Image (as image; you add also e.g.:"?imwidth=175" to the image url to get a 175px wide image)
  - Name
  - Base Price (formatted in German Currency format e.g. 1.2 will be "€1,20" )
  - Base Unit

The tiles should be displayed in a grid and as a list on screens
below 480px. In the grid the minimum tile width should be 300px and maximum should be 400px with as many tiles as possible should fit on screen.

Add an search input field on top that allows filtering the products that contain
the input in the product name.

Bonus:

- Add the count in cart (amount > 0) to the product tile (Note: You have
  to use the `sku` field to find the matching products)

### Additional Information

- Currently the project uses typescript, but you can rename / create js/jsx files
  if you want to opt out of type checking

- Even though this project is fairly simple try to organize it like you would do
  for larger components.

- Don't worry too much about styling

- Feel free to reach out if you have any questions

_Good luck_

Thanks!
I tried to be very detailed in my code comments. Here follows some general information...

##Styling
Define global styles in `src/styles/global.scss` <br>
Colors are defined in `src/styles/colors.scss` and can be used in componts (when located in `src/components`) like this:

```scss
@use '../styles/colors';
.mySelector {
	color: colors.$primary;
}
```

###Utils
I wrote my first TS Function (_YEAH_), it gets a numer and returns it to a currency string: `src/utils/toCurrency.ts`

```js
//usage:
import toCurrency from '../utils/toCurrency';
toCurrency(number or numerableString)
```

###Testing

```bash
# run tests
npm run test

# start test generator
npm run testGen
```

I decided to run all tests on one page, as it makes testing faster, but I'm not sure, if it's a good thing :)

Tests with one page context for each test:
![img.png](DocumentationFiles/img.png)

Tests with one page for all tests:
![img_1.png](DocumentationFiles/img_1.png)

##Code style
```bash
# reformat code with prettier
npm run format

# evaluate code with EsLint
npm run lint
```

##Greetings!
I hope I met the requirements, as I was a total newby in TS and Svelte. It was busy weekend :) I'm looking forward to discuss my work with you guys!
