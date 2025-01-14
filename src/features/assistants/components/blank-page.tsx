
import { Button } from "@/components/ui/button"
import { CreateAssistantDialog } from "./create-assistant-dialog"
import { IconUserPlus } from "@tabler/icons-react"

export default function AssistantsPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-left space-y-6 max-w-[300px]">
                <div className="w-16 h-16 mr-auto relative">
                    <IconUserPlus className="w-16 h-16" />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">Assistants</h1>
                <p className="text-muted-foreground">
                    Assistants are voice AI chat bots used for integrations into your applications.
                </p>
                <p className="text-muted-foreground">
                    You can fully configure them to your business&apos;s needs, and we support all major models and providers.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <CreateAssistantDialog />
                    <Button variant="outline">Documentation</Button>
                </div>
            </div>
        </div>
    )
}

