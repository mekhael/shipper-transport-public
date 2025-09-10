import { defineConfig } from '@playwright/test';
import 'dotenv/config';  


export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL ?? 'https://stage.4shipper.transportly.eu',
    timezoneId: 'Europe/Prague',                 // keep date math stable
    testIdAttribute: 'data-test-id',             // optional; matches your DOM
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
