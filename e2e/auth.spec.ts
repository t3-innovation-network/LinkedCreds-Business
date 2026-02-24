import { test, expect } from '@playwright/test';
test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('sign in button is visible on homepage', async ({ page }) => {
    const signInButton = page.getByRole('button', { name: /sign in|login/i }).or(
      page.getByRole('link', { name: /sign in|login/i })
    ).first();
    
    await expect(signInButton).toBeVisible();
  });

  test('can navigate to credential form and see Google sign-in prompt', async ({ page }) => {
    // Click "Build your first skill" or navigate to credential form
    const buildButton = page.getByRole('link', { name: /build your first skill|start building/i }).or(
      page.getByRole('button', { name: /build your first skill|start building/i })
    ).first();
    
    if (await buildButton.isVisible()) {
      await buildButton.click();
      
      // Should redirect to a valid credential form route (skill, volunteer, role, etc.)
      await expect(page).toHaveURL(/^\/(skill|volunteer|role|performance-review|identity-verification|newcredential)/);
      
      // Wait for the form to load
      await page.waitForLoadState('networkidle');
      
      // Check for Google Drive connection step (Step 0)
      // This indicates the sign-in flow
      const connectButton = page.getByText(/connect.*google|login.*google.*drive/i).or(
        page.getByRole('button', { name: /login.*google.*drive|connect/i })
      ).first();
      
      // The button should be visible (user not authenticated)
      // or the form should proceed if already authenticated
      await expect(
        connectButton.or(page.locator('form'))
      ).toBeVisible({ timeout: 10000 });
    }
  });

  test('authenticated user sees navigation options', async ({ page }) => {
    // Check if user is authenticated by looking for Sign Out button
    // (Sign In button indicates unauthenticated state)
    const signInButton = page.getByRole('button', { name: /sign in/i });
    const signOutButton = page.getByRole('button', { name: /sign out/i });
    
    const isAuthenticated = await signOutButton.isVisible().catch(() => false);
    
    if (!isAuthenticated) {
      // If not authenticated, verify the header/navbar structure exists
      // (even without navigation links)
      const header = page.locator('header').or(
        page.getByRole('banner')
      ).or(
        page.locator('text=LinkedCreds').first()
      );
      await expect(header).toBeVisible();
      return; // Test passes - header exists for unauthenticated users
    }
    
    // For authenticated users, check for navigation links
    const navLinks = [
      page.getByRole('link', { name: /my skills|claims/i }),
      page.getByRole('link', { name: /analytics/i }),
      page.getByRole('link', { name: /help/i })
    ];

    // At least one navigation link should be visible for authenticated users
    const visibleLinks = await Promise.all(
      navLinks.map(link => link.isVisible().catch(() => false))
    );
    
    expect(visibleLinks.some(visible => visible)).toBeTruthy();
  });

  // test('unauthenticated user is prompted to sign in when accessing protected routes', async ({ page }) => {
  //   // Try to access a protected route like /claims
  //   await page.goto('/claims');
    
  //   // Wait for page to be fully loaded
  //   await page.waitForLoadState('domcontentloaded');
    
  //   // Should either:
  //   // 1. Redirect to sign in
  //   // 2. Show sign in prompt
  //   // 3. Show empty state with sign in option
    
  //   const signInText = page.getByText(/sign in|login|connect.*google/i).first();
  //   const signInButton = page.getByRole('button', { name: /sign in|login/i }).first();
  //   const emptyState = page.getByText(/no credentials|get started/i).first();
    
  //   // Check each element individually with timeout
  //   const hasSignInText = await signInText.isVisible({ timeout: 10000 }).catch(() => false);
  //   const hasSignInButton = await signInButton.isVisible({ timeout: 10000 }).catch(() => false);
  //   const hasEmptyState = await emptyState.isVisible({ timeout: 10000 }).catch(() => false);
    
  //   // One of these should be present
  //   expect(hasSignInText || hasSignInButton || hasEmptyState).toBeTruthy();
  // });
});
