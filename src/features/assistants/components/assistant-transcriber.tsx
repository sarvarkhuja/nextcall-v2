"use client";

import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Transcriber } from "../types/assistant";

export default function AssistantTranscriber({ transcriber, backgroundDenoisingEnabled }: { transcriber: Transcriber, backgroundDenoisingEnabled: boolean }) {
    const [provider, setProvider] = useState(transcriber.provider);
    const [language, setLanguage] = useState(transcriber.language);
    const [model, setModel] = useState(transcriber.model);
    const [backgroundDenoising, setBackgroundDenoising] = useState(backgroundDenoisingEnabled);

    useEffect(() => {
        if (transcriber) {
            setProvider(transcriber.provider);
            setLanguage(transcriber.language);
            setModel(transcriber.model);
        }
        if (backgroundDenoisingEnabled) {
            setBackgroundDenoising(backgroundDenoisingEnabled);
        }
    }, [transcriber, backgroundDenoisingEnabled]);

    const providers = ["deepgram", "openai", "google"];
    const languages = [
        { value: "en", label: "English (en)" },
        { value: "es", label: "Spanish (es)" },
        { value: "ru", label: "Russian (ru)" },
        { value: "multi", label: "Multi-language" },
    ];
    const models = ["Nova 2", "Legacy", "Custom"];

    return (
        <div className="space-y-6 p-6 max-w-2xl border rounded-lg shadow-sm">
            <div>
                <h2 className="text-lg font-semibold">Transcription</h2>
                <p className="text-sm text-muted-foreground">
                    This section allows you to configure the transcription settings for the assistant.
                </p>
            </div>

            {/* Provider */}
            <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <Select value={provider} onValueChange={setProvider}>
                    <SelectTrigger id="provider">
                        <SelectValue placeholder="Select Provider" />
                    </SelectTrigger>
                    <SelectContent>
                        {providers.map((provider) => (
                            <SelectItem key={provider} value={provider}>
                                {provider}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Language */}
            <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                        <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                        {languages.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                                {lang.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                    Pro tip: If you want to support both English and Spanish, you can set the language to <b>multi</b> and use <b>ElevenLabs Turbo 2.5</b> in the Voice tab.
                </p>
            </div>

            {/* Model */}
            <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Select value={model} onValueChange={setModel}>
                    <SelectTrigger id="model">
                        <SelectValue placeholder="Select Model" />
                    </SelectTrigger>
                    <SelectContent>
                        {models.map((model) => (
                            <SelectItem key={model} value={model}>
                                {model}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Background Denoising */}
            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="background-denoising">Background Denoising Enabled</Label>
                    <p className="text-sm text-muted-foreground">
                        Filter background noise while the user is talking.
                    </p>
                </div>
                <Switch
                    id="background-denoising"
                    checked={backgroundDenoising}
                    onCheckedChange={setBackgroundDenoising}
                />
            </div>
        </div>
    );
}
