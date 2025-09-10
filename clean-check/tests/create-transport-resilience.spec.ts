import { test , expect} from '@playwright/test';

test('Usability: button enable/disable and duplicate prevention', async ({ page }) => {
  await page.goto('/register');
  const randomId = Date.now();
  const email = `user${randomId}@test.com`;
  const submitBtn = page.locator('.registration-form-submit');

  // Click immediately -> should not advance
  await submitBtn.click();
  await expect(page.locator('#password\\.new_password1')).not.toBeVisible();

  // Partial form fill -> still not advance
  await page.locator('#name').fill('Test User');
  await page.locator('#company').fill('Test Company');
  await submitBtn.click();
  await expect(page.locator('#password\\.new_password1')).not.toBeVisible();

  // Fill required fields
  await page.locator('#phoneNumber').fill('+421900000000');
  await page.locator('#email').fill(email);
  await page.locator('[name="terms"]').check();

  await expect(submitBtn).toBeEnabled();
  await submitBtn.click();
  await expect(page.locator('#password\\.new_password1')).toBeVisible();
});