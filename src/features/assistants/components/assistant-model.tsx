import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Assistant } from "../types/assistant";
import { Slider } from "@/components/ui/slider"
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axiosInstance from "@/lib/axiosInstance";
import { FileItem } from "@/features/files/types/file.type";

const MODEL_PROVIDERS = [{
    value: "gpt-4o",
    title: "GPT 4o cluster",
    responseTime: "300ms",
    price: "$0.02"
}, {
    value: "gpt-3.5-turbo",
    title: "GPT 3.5 Turbo",
    responseTime: "100ms",
    price: "$0.0015"
}, {
    value: "gpt-4o-mini-realtime-preview-2024-12-17",
    title: "GPT 4o Mini Realtime",
    responseTime: "700ms",
    price: "$0.09"
}];
export function AssistantModel({ assistant }: { assistant: Assistant }) {
    const initialState = {
        provider: assistant?.model?.provider,
        model: assistant?.model?.model,
        temperature: assistant?.model?.temperature,
        maxTokens: assistant?.model?.maxTokens,
        detectEmotion: assistant?.model?.emotionRecognitionEnabled,
        systemPrompt: assistant?.model?.messages[0].content,
        firstMessage: assistant?.firstMessage,
        fileId: assistant?.model?.knowledgeBase?.fileIds[0]
    };

    const [provider, setProvider] = useState(initialState.provider);
    const [model, setModel] = useState(initialState.model);
    const [temperature, setTemperature] = useState(initialState.temperature);
    const [maxTokens, setMaxTokens] = useState(initialState.maxTokens);
    const [detectEmotion, setDetectEmotion] = useState(initialState.detectEmotion);
    const [systemPrompt, setSystemPrompt] = useState(initialState.systemPrompt);
    const [firstMessage, setFirstMessage] = useState(initialState.firstMessage);
    const [files, setFiles] = useState<FileItem[]>([]);
    const [fileId, setFileId] = useState(initialState.fileId);
    useEffect(() => {
        if (!assistant) return;
        setProvider(assistant.model.provider);
        setModel(assistant.model.model);
        setTemperature(assistant.model.temperature);
        setMaxTokens(assistant.model.maxTokens);
        setDetectEmotion(assistant.model.emotionRecognitionEnabled);
        setSystemPrompt(assistant.model.messages[0]?.content);
        setFirstMessage(assistant.firstMessage);
        setFileId(assistant.model.knowledgeBase?.fileIds[0]);
    }, [assistant]);

    async function fetchFiles() {
        const { data: files } = await axiosInstance.get(`/file`);
        setFiles(files);
    }
    useEffect(() => {
        fetchFiles();
    }, []);
    return (
        <>
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-1">Model</h2>
                <p className="text-sm text-muted-foreground mb-4">
                    This section allows you to configure the model for the assistant.
                </p>
                <div className="flex gap-4 w-full">
                    <div className="w-[70%]">
                        <div className="grid gap-2">
                            <label htmlFor="first-message">First Message</label>
                            <Input
                                id="first-message"
                                value={firstMessage}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="system-prompt">System Prompt</label>
                            <Textarea
                                id="system-prompt"
                                className="min-h-[400px]"
                                value={systemPrompt}
                            />
                        </div>
                    </div>
                    <div className="w-[30%] grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="provider">Provider</Label>
                            <Select value={provider} onValueChange={setProvider}>
                                <SelectTrigger id="provider">
                                    <SelectValue placeholder="Select Provider" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="openai">openai</SelectItem>
                                    <SelectItem value="another-provider">Another Provider</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Model */}
                        <div className="space-y-2">
                            <Label htmlFor="model">Model</Label>
                            <Select value={model} onValueChange={setModel}>
                                <SelectTrigger id="model">
                                    <SelectValue placeholder="Select Model" />
                                </SelectTrigger>
                                <SelectContent>
                                    {MODEL_PROVIDERS.map((provider) => (
                                        <SelectItem key={provider.value} value={provider.value}>
                                            <div className="flex flex-col">
                                                <span>{provider.title}</span>
                                                <div className="flex items-center text-sm text-muted-foreground gap-2">
                                                    <span>{provider.responseTime}</span>
                                                    <span>{provider.price}</span>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Knowledge Base */}
                        <div className="space-y-2">
                            <Label htmlFor="knowledge-base">Knowledge Base</Label>
                            <Select value={fileId} onValueChange={setFileId}>
                                <SelectTrigger id="knowledge-base">
                                    <SelectValue placeholder="Select Files" />
                                </SelectTrigger>
                                <SelectContent>
                                    {files.map((file) => (
                                        <SelectItem key={file.id} value={file.id}>{file.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Temperature */}
                        <div className="space-y-2">
                            <Label htmlFor="temperature">Temperature</Label>
                            <Slider
                                id="temperature"
                                value={[temperature]}
                                max={2}
                                step={0.1}
                                onValueChange={(value) => setTemperature(value[0])}
                            />
                            <div>{temperature.toFixed(1)}</div>
                        </div>

                        {/* Max Tokens */}
                        <div className="space-y-2">
                            <Label htmlFor="max-tokens">Max Tokens</Label>
                            <Input
                                id="max-tokens"
                                type="number"
                                value={maxTokens}
                                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                            />
                        </div>

                        {/* Detect Emotion */}
                        <div className="flex items-center space-x-3">
                            <Switch
                                id="detect-emotion"
                                checked={detectEmotion}
                                onCheckedChange={setDetectEmotion}
                            />
                            <Label htmlFor="detect-emotion">Detect Emotion</Label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}