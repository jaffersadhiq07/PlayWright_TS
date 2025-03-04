import{test} from "@playwright/test"

test('Built-In locators', async({page})=>{

    await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=common/home")
    await page.waitForTimeout(3000);

    await page.getByAltText("Poco Electro");
    await page.waitForTimeout(3000);

    await page.getByPlaceholder("Search For Products").nth(0).fill("iPod Nano");
    await page.waitForTimeout(3000);

    await page.getByText("Search").click();
    await page.waitForTimeout(3000);

    await page.getByRole('link', {name:"iPod Nano"}).first().click();
    await page.waitForTimeout(3000);
       
    await page.getByTitle("Buy now").click();
    await page.waitForTimeout(5000);

    await page.locator("//button/i[@class='fas fa-times-circle']").click();
    await page.waitForTimeout(5000);
})