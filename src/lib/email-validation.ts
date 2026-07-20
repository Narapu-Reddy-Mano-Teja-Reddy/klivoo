// Suffix-matched disposable/temporary email providers. A match is silently
// dropped (fake 200) so bots can't probe the filter.
const DISPOSABLE_EMAIL_DOMAINS = [
  'mailinator.com',
  'guerrillamail.com',
  '10minutemail.com',
  'tempmail',
  'yopmail.com',
  'trashmail',
  'throwaway',
]

export function isDisposableEmail(email: string): boolean {
  const domain = email.slice(email.lastIndexOf('@') + 1)
  return DISPOSABLE_EMAIL_DOMAINS.some(
    (bad) => domain === bad || domain.endsWith(`.${bad}`) || domain.includes(bad)
  )
}
