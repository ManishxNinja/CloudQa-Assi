const { Builder, By, until } = require('selenium-webdriver');
const { describe, it, before, after } = require('mocha');

let driver;

describe("CloudQA Automation Form Tests", function () {
  this.timeout(40000);

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://app.cloudqa.io/home/AutomationPracticeForm");
  });

  after(async function () {
    await driver.quit();
  });

 
  async function switchToFormIframe() {
    const iframes = await driver.findElements(By.css("iframe"));
    if (iframes.length > 0) {
      await driver.switchTo().frame(iframes[0]);
    }
  }

  it("Test 1: Enter First Name", async function () {
    await switchToFormIframe();
    const firstName = await driver.findElement(By.css("input[placeholder='Name']"));
    await firstName.sendKeys("John");
    const value = await firstName.getAttribute("value");
    if (value !== "John") throw new Error("First name not entered correctly");
    await driver.switchTo().defaultContent();
  });

  it("Test 2: Select Gender Male", async function () {
    await switchToFormIframe();
    const maleOption = await driver.findElement(By.css("input[value='Male']"));
    await maleOption.click();
    const selected = await maleOption.isSelected();
    if (!selected) throw new Error("Gender option not selected");
    await driver.switchTo().defaultContent();
  });

  it("Test 3: Enter Email", async function () {
    await switchToFormIframe();
    const email = await driver.findElement(By.css("input[placeholder='Email']"));
    await email.sendKeys("test@example.com");
    const value = await email.getAttribute("value");
    if (value !== "test@example.com") throw new Error("Email not entered");
    await driver.switchTo().defaultContent();
  });
});
