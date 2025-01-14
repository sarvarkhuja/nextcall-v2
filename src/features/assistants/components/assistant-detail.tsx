"use client"

import { Copy, Info, Phone, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { Assistant } from "../types/assistant"

import { AssistantModel } from './assistant-model'
import AssistantTranscriber from './assistant-transcriber'
import AssistantVoice from './assistant-voice'
import AssistantAnalysis from './assistant-analysis'

interface AssistantDetailProps {
    assistant: Assistant | undefined
}

export function AssistantDetail({ assistant }: AssistantDetailProps) {
    return (assistant &&
        <div className="flex-1 overflow-auto">
            <div className="p-6">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{assistant.name}</h1>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Assistant ID</span>
                            <code className="px-2 py-1 bg-muted rounded">{assistant.id}</code>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Copy className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Phone className="mr-2 h-4 w-4" />
                            Talk with Assistant
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Info className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="flex gap-4 mb-6">
                    <Badge variant="secondary" className="capitalize">
                        {assistant.model.model.toString()}
                    </Badge>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8 mx-8">
                <div className="p-4 border rounded-lg">
                    <div className="flex justify-between mb-2">
                        <h3 className="font-medium flex items-center gap-2">
                            Cost
                            <Info className="h-4 w-4 text-muted-foreground" />
                        </h3>
                        <span className="text-sm text-muted-foreground">{assistant.cost ?? '$0.09/min'}</span>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 rounded" />
                </div>
                <div className="p-4 border rounded-lg">
                    <div className="flex justify-between mb-2">
                        <h3 className="font-medium flex items-center gap-2">
                            Latency
                            <Info className="h-4 w-4 text-muted-foreground" />
                        </h3>
                        <span className="text-sm text-muted-foreground">{assistant.latency ?? '700ms'}</span>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-rose-500 via-blue-500 to-yellow-500 to-purple-500 rounded" />
                </div>
            </div>

            <Tabs defaultValue="model" className="mx-8">
                <div className="flex justify-between items-center">
                    <TabsList className="w-min justify-start">
                        <TabsTrigger value="model">Model</TabsTrigger>
                        <TabsTrigger value="transcriber">Transcriber</TabsTrigger>
                        <TabsTrigger value="voice">Voice</TabsTrigger>
                        <TabsTrigger value="analysis">Analysis</TabsTrigger>
                    </TabsList>
                    <Button variant="secondary">
                        Publish Assistant
                    </Button>
                </div>
                <TabsContent value="model" className="space-y-6">
                    <AssistantModel assistant={assistant} />
                </TabsContent>
                <TabsContent value="transcriber">
                    <AssistantTranscriber transcriber={assistant.transcriber} backgroundDenoisingEnabled={assistant.backgroundDenoisingEnabled}/>
                </TabsContent>
                <TabsContent value="voice">
                    <AssistantVoice voice={assistant.voice} backchannelingEnabled={assistant.backchannelingEnabled}  />
                </TabsContent>
                <TabsContent value="analysis">
                    <AssistantAnalysis analysis={assistant.analysisPlan} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

