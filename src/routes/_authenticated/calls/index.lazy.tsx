import PhoneCallPage from '@/features/phone-call'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/calls/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PhoneCallPage />
}
