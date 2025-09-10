// create-transport-happy.spec.ts
import { test, expect } from '@playwright/test';
import { login, getDateTestId, formatDate } from './utils';

test.describe('Create transport - happy path', () => {
  test('Create transport Journey', async ({ page }) => {
    // Login
    await login(page);

    // Start new request
    await page.getByRole('link', { name: 'New request' }).click();
    await expect(page).toHaveURL(/\/request\/create$/);

    // Pickup date (first input): select tomorrow
    const pickupInput = page.locator('[data-test-id="dp-input"]').first();
    await pickupInput.click();

    const tomorrowId = getDateTestId(1); // dp-YYYY-MM-DD
    await page.locator(`[data-test-id="${tomorrowId}"]`).click();
    await page.locator('[data-test-id="select-button"]').click();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await expect(pickupInput).toHaveValue(new RegExp(formatDate(tomorrow))); // match date only

    // Delivery date (second input): select after tomorrow
    const deliveryInput = page.locator('[data-test-id="dp-input"]').nth(1);
    await deliveryInput.click();

    const afterTomorrowId = getDateTestId(2);
    await page.locator(`[data-test-id="${afterTomorrowId}"]`).click();
    await page.locator('[data-test-id="select-button"]').click();

    const afterTomorrow = new Date();
    afterTomorrow.setDate(afterTomorrow.getDate() + 2);
    await expect(deliveryInput).toHaveValue(new RegExp(formatDate(afterTomorrow))); // match date only

    // Fill cities with two distinct random European cities
    const pool = [
      'Berlin', 'Paris', 'Vienna', 'Prague', 'Warsaw',
      'Budapest', 'Madrid', 'Rome', 'Amsterdam', 'Copenhagen',
    ];
    const [fromCity, toCity] = pool.sort(() => 0.5 - Math.random()).slice(0, 2);
    expect(fromCity).not.toBe(toCity);

    // Pickup city
    const pickupCity = page.locator('input[name="waypoints[0].city"]');
    await pickupCity.click();
    await pickupCity.fill('');
    await pickupCity.type(fromCity, { delay: 40 });

    // If Google Places suggestions appear, pick the first; otherwise just keep typed value
    const firstSuggestion = page.locator('.pac-item').first();
    if (await firstSuggestion.isVisible().catch(() => false)) {
      await firstSuggestion.click();
    } else {
      await pickupCity.blur();
    }

    // Delivery city
    const deliveryCity = page.locator('input[name="waypoints[1].city"]');
    await deliveryCity.click();
    await deliveryCity.fill('');
    await deliveryCity.type(toCity, { delay: 40 });

    const firstSuggestion2 = page.locator('.pac-item').first();
    if (await firstSuggestion2.isVisible().catch(() => false)) {
      await firstSuggestion2.click();
    } else {
      await deliveryCity.blur();
    }

    // Assert the inputs contain the chosen cities (substring match tolerates "City, Country")
    await expect(pickupCity).toHaveValue(new RegExp(fromCity, 'i'));
    await expect(deliveryCity).toHaveValue(new RegExp(toCity, 'i'));
  });
});
