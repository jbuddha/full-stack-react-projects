import { test } from './fixtures/index.js'

test('allows signup and login', async ({ page, auth }) => {
  await auth.signUpAndLogin()
  await page.getByRole('button', { name: 'Logout' }).click()
})
