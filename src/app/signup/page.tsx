import { AuthPage } from '@/components/ui/auth-page'

export const metadata = {
  title: 'Start Free — Kliv∞',
  description: 'Join Kliv∞ today and start operating calmly.',
}

export default function SignupPage() {
  return <AuthPage mode="signup" quote="Built for modern businesses that never stop growing." author="Tenspick Labs" />
}
