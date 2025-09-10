import { test, expect } from "@playwright/test";

test("Registration flow", async ({ page }) => {
  await page.goto("/register");
  const randomId = Date.now();
  const name = `User${randomId}`;
  const company = `Company${randomId}`;
  const phone = `+4219${Math.floor(Math.random() * 100000000)}`;
  const email = `user${randomId}@test.com`;
  const password = `StrongPass${Math.floor(Math.random() * 1000)}!`;

  await test.step("Fill and submit registration form", async () => {
    await page.locator("#name").fill(name);
    await page.locator("#company").fill(company);
    await page.locator("#phoneNumber").fill(phone);
    await page.locator("#email").fill(email);

    const terms = page.locator('[name="terms"]');
    const marketing = page.locator('[name="marketingPurposes"]');

    await terms.check();
    await marketing.check();
    await expect(terms).toBeChecked();
    await expect(marketing).toBeChecked();

    await page.locator(".registration-form-submit").click();
  });

  await test.step("Set password", async () => {
    const pass1 = page.locator("#password\\.new_password1");
    const pass2 = page.locator("#password\\.new_password2");

    await expect(pass1).toBeVisible();
    await pass1.fill(password);
    await pass2.fill(password);

    await page.locator('[type="submit"]').click();
 await expect(page.getByText(name, { exact: true })).toBeVisible();

  });
});
