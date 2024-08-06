import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Maps' }).click();
  await page.getByRole('button', { name: 'Open sidebar - useDialogOnly' }).click();
  const name = await page.getByRole('heading', { name: 'WeatherEase' }).innerHTML()
  expect(name).toBe('WeatherEase');
});