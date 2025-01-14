import Assistants from '@/features/assistants'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/assistants/')({
  component: Assistants,
})


