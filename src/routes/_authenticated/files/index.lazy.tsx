import Files from '@/features/files'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/files/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Files />
}
