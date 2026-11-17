import { test, expect, Page, Locator } from '@playwright/test';

test.describe('Default Vite + React Smoke Test', (): void => {
  test('renders default Vite + React starter page with logos, heading, and interactive counter', async ({
    page,
  }: {
    page: Page;
  }): Promise<void> => {
    await page.goto('/');

    // Verify HTML document title
    await expect(page).toHaveTitle('Ascend');

    // Verify Vite + React heading
    const heading: Locator = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Vite + React');

    // Verify counter button exists and displays initial count of 0
    const counterButton: Locator = page.getByTestId('counter-button');
    await expect(counterButton).toBeVisible();
    await expect(counterButton).toHaveText('count is 0');

    // Click counter and verify it increments to 1
    await counterButton.click();
    await expect(counterButton).toHaveText('count is 1');
  });
});
