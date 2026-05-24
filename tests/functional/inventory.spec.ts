import { test, expect } from '@playwright/test';

test.describe('Inventory feature', () => {

    test.beforeEach('Login with valid creds', async ({ page }) => {

        // Launch URL
        await page.goto('https://www.saucedemo.com/');

        // Login
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        // Assert
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page).toHaveURL(/.*\/inventory/);

    });

    test('Should confirm all prices are non-zero values', async ({ page }) => {

        // Get list of products
        let productElms = await page.locator('.inventory_item');
        await expect(productElms).toHaveCount(6);

        // Get product name and price
        let totalProducts = await productElms.count();

        let priceArr = [];
        for (let i = 0; i < totalProducts; i++) {
            let eleNode = productElms.nth(i);
            
            // Product name
            let productName = await eleNode.locator('.inventory_item_name').innerText();

            // Price
            let price = await eleNode.locator('.inventory_item_price').innerText();

            // Print result
            console.log(`Product: ${productName}, Price: ${price}`);

            priceArr.push(price);
            
        }

        console.log(`original prices ${priceArr}`);
        
        let modifiedPriceArr = priceArr.map((item) => parseFloat(item.replace("$", '')));
        console.log(`modified price array : ${modifiedPriceArr}`);

        let priceArrWithInvalidVals = modifiedPriceArr.filter((item) => item <= 0);

        expect(priceArrWithInvalidVals).toHaveLength(0);


    });

});


