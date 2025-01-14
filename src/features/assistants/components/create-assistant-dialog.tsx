"use client"

import { useState } from "react"
import { Plus, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const templates = [
    {
        id: "blank",
        name: "Blank Template",
        description: "This blank slate template with minimal configurations. It's a starting point for creating your custom assistant.",
        icon: Plus,
    },
    {
        id: "appointment",
        name: "Appointment Setter",
        description: "Designed for dental practices to demonstrate setting appointments. It streamlines scheduling, answers common questions, and provides service information.",
        icon: Users,
    },
    {
        id: "support",
        name: "Customer Support",
        description: "A versatile template designed with a perfect mix of emotional intelligence and technical knowledge. Ideal for empathetic, efficient customer support.",
        icon: Users,
    },
    {
        id: "qa",
        name: "Inbound Q/A",
        description: "An inbound call agent example designed to provide comprehensive support for SmartHome innovations. With a deep understanding of product details and troubleshooting.",
        icon: Users,
    },
    {
        id: "game",
        name: "Game NPC",
        description: "An assistant for demonstrating an in-game NPC, Elenya is designed to offer guidance, lore, and insights into the mysteries of the natural world.",
        icon: Users,
    },
]

export function CreateAssistantDialog() {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Create Assistant
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Create Assistant
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div>
                        <h2 className="font-semibold mb-1">Choose a template</h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            Here&apos;s a few templates to get you started, or you can create your own template and use it to create a new assistant.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="assistant-name">
                                Assistant Name <span className="text-muted-foreground text-sm">(This can be adjusted at any time after creation.)</span>
                            </Label>
                            <Input
                                id="assistant-name"
                                placeholder="New Assistant"
                                className="mt-1.5"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {templates.map((template) => (
                                <div
                                    key={template.id}
                                    className={`flex gap-4 p-4 border rounded-lg hover:bg-accent cursor-pointer ${selectedTemplate === template.id ? "border-primary bg-accent" : ""
                                        }`}
                                    onClick={() => setSelectedTemplate(template.id)}
                                >
                                    <template.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-medium">{template.name}</h3>
                                        <p className="text-sm text-muted-foreground">{template.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <DialogTrigger asChild>
                            <Button variant="outline">Close</Button>
                        </DialogTrigger>
                        <Button disabled={!selectedTemplate}>
                            Create Assistant
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
