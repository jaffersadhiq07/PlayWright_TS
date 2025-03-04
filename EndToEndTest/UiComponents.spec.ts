import{test,expect, Locator, errors} from "@playwright/test"

test.skip('Handling input box', async({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/")
await expect(page).toHaveURL('https://testautomationpractice.blogspot.com/');
await expect(page).toHaveTitle("Automation Testing Practice")
await expect(await page.locator("//input[@id='name']")).toBeVisible();
await expect(await page.locator("//input[@id='name']")).toBeEmpty();
await expect(await page.locator("//input[@id='name']")).toBeEditable();
await page.waitForSelector("//input[@id='name']")
await page.locator("//input[@id='name']").fill("Automation")
await page.waitForTimeout(3000);
  
})


test.skip('Radio button', async({page})=>{

   await page.goto("https://testautomationpractice.blogspot.com/")
   const btnRadio = await page.locator("//input[@id='male']")
   await btnRadio.click();
   await expect(btnRadio).toBeChecked();
   await page.waitForTimeout(5000);

  })

  test.skip('Checkbox', async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/")
    const CheckBox = await page.$$("//div[@class='form-check form-check-inline']/input[@type='checkbox']")
    console.log("Number of checkbox:",CheckBox.length)
    await expect(CheckBox).toHaveLength(7)

     for(let i=0; i<CheckBox.length; i++)
    {
       await CheckBox[i].check();
       await page.waitForTimeout(2000);
       await expect(CheckBox).toBeTruthy();

    }

     //Soft Assertion
     await expect.soft(CheckBox).not.toHaveLength(10)
     await page.waitForTimeout(3000)
  })




test.skip('Drop Down', async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/")
   //1. visibility of the text
   await page.locator("//select[@id='country']").scrollIntoViewIfNeeded();
   await page.locator("//select[@id='country']").selectOption({label:'India'})
   await page.waitForTimeout(5000);

   //2. passing by value
   await page.locator("//select[@id='country']").selectOption({value:'usa'})
   await page.waitForTimeout(5000);

   //3. passing by Index
   await page.locator("//select[@id='country']").selectOption({index:7})
   await page.waitForTimeout(5000);


   const options = await page.$$("(//select[@class='form-control'])[1]/option")
   console.log("Number of option present in DropDown: ",options.length)
   await expect(options.length).toBe(10)
   for(let i=0; i<options.length;i++)
    {
        await options[i].isVisible();
        let opt = await options[i].textContent()
        console.log("Drop Down Options ",opt)
                
    }

})

test.skip('Alerts & popup', async({page})=>{

  await page.goto("https://testautomationpractice.blogspot.com/")
  await page.waitForTimeout(3000);

  await page.on('dialog',async dialog=>{

  await expect(dialog.type()).toContain('prompt')
  await expect(dialog.message()).toContain('Please enter your name:')
  console.log(`ALert Meassage is :${dialog.message()}`)
  await expect(dialog.defaultValue()).toContain('Harry Potter')
  await page.waitForTimeout(3000);
  await (dialog.accept('Playwright Automation'));

  })

  await page.locator("//button[@id='promptBtn']").click();
  await page.waitForTimeout(5000);
})

test.skip('Mouse actions',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.hover("//div[@class='dropdown']");
    await page.waitForTimeout(3000)

    const doubleclick = await page.locator("//button[normalize-space()='Copy Text']")
    await doubleclick.scrollIntoViewIfNeeded();
    doubleclick.dblclick();
    const text = await page.locator("#field2")
    await text.textContent()
    await expect(text).toHaveValue("Hello World!")



    //Drag and Drop
   const source =  await page.locator("//div[@class='ui-widget-content ui-draggable ui-draggable-handle']")
   await source.scrollIntoViewIfNeeded();
   const destination = await page.locator("//div[@class='ui-widget-header ui-droppable']")
   await page.waitForTimeout(3000)
   await source.dragTo(destination)
   await page.waitForTimeout(3000)
    
})

test.skip('Working with screentshot', async({page})=>{

  await page.goto("https://testautomationpractice.blogspot.com/")
  await page.screenshot({path:'EndToEndTest/screenshot/'+'Screenshot.png'})
  await page.waitForTimeout(3000)

  await test.step('Full Page screenshot', async()=>{
  await page.screenshot({path:'EndToEndTest/screenshot/'+'FullPage.png',fullPage:true})
  await page.waitForTimeout(3000)

  await test.step('Only particular element screenshot', async()=>{
  await page.locator("//div[@class='fauxborder-left header-fauxborder-left']").screenshot({path:'EndToEndTest/screenshot/'+'ParticularElement.png'})
  await page.waitForTimeout(3000)
})

})
})

test.only('Uploading a file', async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    const File = await page.locator("//input[@id='singleFileInput']")
    await File.click();
    await File.setInputFiles('EndToEndTest/Document_Page.txt')
    await page.waitForTimeout(10000)
})




test.skip('Trace Viewer', async ({ page }) => {

  await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=common/home")
  await page.waitForTimeout(3000);

  await page.getByAltText("Poco Electro")
  await page.waitForTimeout(3000);

  await page.getByPlaceholder("Search For Products").nth(0).fill("iPod Nano");
  await page.waitForTimeout(3000);

  await page.getByText("Search").click();
  await page.waitForTimeout(3000);

  await page.getByRole('link', {name:"iPod Nano"}).first().click();
  await page.waitForTimeout(3000);
     
  await page.getByTitle("Buy now").click();
  await page.waitForTimeout(5000);

  const btnRemove = await page.locator("//button/i[@class='fas fa-times-circle']");
  await expect(btnRemove).toBeDisabled();
  await page.waitForTimeout(5000);
})

test("error handling",async({page})=>{
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login')
    const emailid:Locator = await page.locator('[id="input-email"]');
    const pass:Locator = await page.locator('[name="password"]');
    const btn:Locator = await page.locator('[value="Login"]');
    const img:Locator = await page.locator('#naveenopencart');
    if(await expect(emailid).toBeVisible)
    {
        try{
            await emailid.fill("pwtest@opencart.com");
            await pass.fill("Playwright@123");
            await page.waitForTimeout(5000);
            await btn.click();
        }catch(error)
        {
            console.log("error meassage", errors)
        }
    }
   
})

test("First approch Get frame using frame's URL", async({page})=>{
  //Two ways to handel the frames
  // Get frame using the frame's name attribute
  // Get frame using frame's URL
  await page.goto('https://ui.vision/demo/webtest/frames/')
  //to count the frames use it this method frames()
  const frames = await page.frames()
  console.log("Total frames availables",frames.length)
  const frame1 = await page.frame({url:'https://ui.vision/demo/webtest/frames/frame_4.html'})
  await frame1?.locator("//input[@name='mytext4']").fill("Jaffer sadhiq")
  await page.waitForTimeout(3000);
})