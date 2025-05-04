import { test, expect } from './fixtures/index.js'

test('allows signup and login', async ({ page, auth }) => {
  await page.goto('/')
  const testUser = await auth.signUpAndLogin()
  await page.getByRole('button', { name: 'Logout' }).click()
})
