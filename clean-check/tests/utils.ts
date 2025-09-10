import { Page, expect } from '@playwright/test';

export async function login(page: Page) {
  const email = process.env.E2E_EMAIL;
  const password = process.env.E2E_PASSWORD;
  if (!email || !password) {
    throw new Error('Missing E2E_EMAIL or E2E_PASSWORD in env');
  }
  await page.goto('/login');
  await expect(page).toHaveURL(/\/login/);
  await page.fill('input[name="email"], input[type="email"]', email);
  await page.fill('input[name="password"], input[type="password"]', password);
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL('/request/list');
}

export function getDateTestId(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `dp-${yyyy}-${mm}-${dd}`;
 
}

// Ensures DD.MM.YYYY with leading zeros (to match the input UI)
export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function getRandomCity() {
  const cities = [
    'Berlin',
    'Paris',
    'Vienna',
    'Prague',
    'Warsaw',
    'Budapest',
    'Madrid',
    'Rome',
    'Amsterdam',
    'Copenhagen',
  ];
  return cities[Math.floor(Math.random() * cities.length)];
}
