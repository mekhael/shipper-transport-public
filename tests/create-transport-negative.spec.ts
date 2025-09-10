import { test, expect } from '@playwright/test';

test('Negative scenario: validation errors on empty form', async ({ page }) => {
  await page.goto('/register');

  await page.click('button.registration-form-submit');

  await expect(page.locator('.error-message')).toContainText([
    'Name is required',
    'Company name is required',
    'Phone is required',
    'Email is required',
    'You must agree with Terms and conditions',
  ]);
});