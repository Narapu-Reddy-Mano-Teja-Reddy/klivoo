import { AuthPage } from '@/components/ui/auth-page'

export const metadata = {
  title: 'Sign In — Kliv∞',
  description: 'Sign in to your Kliv∞ client operations workspace.',
}

export default function LoginPage() {
  return <AuthPage mode="login" quote="Built for modern businesses that never stop growing." author="Tenspick Labs" />
}