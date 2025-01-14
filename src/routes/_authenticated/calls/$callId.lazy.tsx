import PhoneHistoryDetailPage from '@/features/phone-call/components/phone-call-detail'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/calls/$callId')({
    component: RouteComponent,
})

function RouteComponent() {
    const { callId } = Route.useParams()
    return <PhoneHistoryDetailPage phoneId={callId} />
} 