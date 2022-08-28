import type {Page} from '@playwright/test';
import {expect, test} from '@playwright/test';

/*
 In real life it would make send to structure tests feature wise:

 // test.list.ts
import { test } from '@playwright/test';
import featureBTests from './feature-b.spec.ts';
import featureATests from './feature-a.spec.ts';

test.describe(featureBTests);
test.describe(featureATests);

like described here:
https://playwright.dev/docs/next/test-parallel#control-test-order

*
*/

const customConfig = {
	startPage: '/',
	deviceBreakPoints: {
		mobile: 480
	},
	fakeApiTimeOut: 5000,
	productFilterInput: 'milch'
};

test.describe('E2E', () => {
	// use the same browser page for all tests to speed up testing
	let page: Page;
	let defaultViewPort: {
		width: number;
		height: number;
	} | null;

	//alias for better readability
	const mobileBrkP = customConfig.deviceBreakPoints.mobile;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();
		page = await context.newPage();
		await page.goto(customConfig.startPage);
		defaultViewPort = page.viewportSize();
	});

	// close browser after all tests to prevent memory leags
	test.afterAll(async ({ browser }) => {
		await browser.close();
	});

	//start testing
	test('Loading should be visible', async () => {
		// loading info shown?
		// this test can fail if the api is to fast and the loader is not visible anymore, when test is running
		// happend when api.ts was responding in 100ms
		await expect(page.locator('#loading-info')).toBeVisible();

		// wait for products before running the following tests (headline will be mounted when fake api is done)
		await page.waitForSelector('#prods-headline', { timeout: customConfig.fakeApiTimeOut });
	});

	test('Products should be displayed with grid at viewport > 479px and in list < 480', async () => {
		await page.setViewportSize({ width: mobileBrkP, height: 600 });
		//product grid visible?
		await expect(page.locator('#prodGrid')).toBeVisible();

		//product list not mounted?
		await expect(page.locator('#prodList')).toHaveCount(0);

		await page.setViewportSize({ width: mobileBrkP - 1, height: 600 });
		//product list visible?
		await expect(page.locator('#prodList')).toBeVisible();

		//product grid not mounted?
		await expect(page.locator('#prodGrid')).toHaveCount(0);
	});

	// test loop for different view ports
	const viewPorts = [
		{ width: mobileBrkP, height: 600 },
		{ width: mobileBrkP - 1, height: 600 }
	];

	viewPorts.forEach((vP, i) => {
		test(`Viewport width: ${vP.width} -> Product should display image, name, price and unit, in grid and list`, async () => {
			await page.setViewportSize(vP);
			await expect(page.locator('.product-name').first()).toBeVisible();
			await expect(page.locator('.price').first()).toBeVisible();
			await expect(page.locator('.unit').first()).toBeVisible();
			await expect(page.locator('.product-image').first()).toBeVisible();

			//set page size back to default
			if (i === viewPorts.length - 1 && defaultViewPort !== null) {
				await page.setViewportSize(defaultViewPort);
			}
		});
	});

	test('Filter Prodducts', async () => {
		//count poduct tiles
		const prodsCount = await page.locator('.grid-tile').count();
		console.log('prods count vor suche: ' + prodsCount);

		// Filter for search string
		await page.locator('[placeholder="Search"]').fill(customConfig.productFilterInput);
		//test key handler
		await page.locator('[placeholder="Search"]').press('Enter');

		const countFilteredProds = async () => await page.locator('.grid-tile').count();

		console.log('prods count nach suche: ' + (await countFilteredProds()));

		//filter results less than total count?
		await expect((await countFilteredProds()) < prodsCount).toBe(true);

		//clear search
		await page.locator('#search-input').fill('');
		//test mouse click filter
		await page.locator('#search-btn').click();
		//filter results equal to total count?
		await expect(await countFilteredProds()).toBe(prodsCount);
	});

	test('Error page shows message', async () => {
		await page.goto('/error');
		//text=öäü!'§$%&/>()=?\
		await expect(page.locator('#error-msg')).toHaveText("öäü!'§$%&/>()=?\\");
	});
});
