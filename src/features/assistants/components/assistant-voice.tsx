"use client"

import { Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from 'react'
import { Voice } from '../types/assistant'

const VOICE_OPTIONS = [
    { value: 'ash', label: 'Ash' },
    { value: 'nova', label: 'Nova' },
    { value: 'echo', label: 'Echo' },
    { value: 'onyx', label: 'Onyx' },
    { value: 'shimmer', label: 'Shimmer' }
];

const PROVIDER_OPTIONS = [
    { value: 'openai', label: 'OpenAI' },
    { value: 'elevenlabs', label: 'ElevenLabs' },
    { value: 'azure', label: 'Azure' }
];

const BACKGROUND_SOUND_OPTIONS = [
    { value: 'default', label: 'Default' },
    { value: 'office', label: 'Office' }
];

export default function VoiceConfiguration({ voice, backchannelingEnabled }: { voice: Voice, backchannelingEnabled: boolean }) {
    const [speed, setSpeed] = useState(voice.speed);
    const [provider, setProvider] = useState(voice.provider);
    const [voiceId, setVoiceId] = useState(voice.voiceId);
    const [fillerInjectionEnabled, setFillerInjectionEnabled] = useState(voice.fillerInjectionEnabled);
    const [backgroundSound, setBackgroundSound] = useState(backchannelingEnabled);

    useEffect(() => {
        if (voice) {
            setSpeed(voice.speed);
            setProvider(voice.provider);
            setVoiceId(voice.voiceId);
            setFillerInjectionEnabled(voice.fillerInjectionEnabled);
            setBackgroundSound(backchannelingEnabled);
        }
    }, [voice]);
    return (
        <div className="w-full max-w-4xl space-y-6 pt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Voice Configuration</CardTitle>
                    <CardDescription>
                        Choose from the list of voices, or sync your voice library if you aren&apos;t able to find your voice in the dropdown. If you are still facing any error, you can enable custom voice and add a voice ID manually.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium">Provider</label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>Select your voice provider</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <Select onValueChange={setProvider} value={provider}>
                            <SelectTrigger>
                                <SelectValue placeholder={provider} />
                            </SelectTrigger>
                            <SelectContent>
                                {PROVIDER_OPTIONS.map((provider) => (
                                    <SelectItem key={provider.value} value={provider.value}>
                                        {provider.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Voice</label>
                        <Select onValueChange={setVoiceId} value={voiceId}>
                            <SelectTrigger>
                                <SelectValue placeholder="ash" />
                            </SelectTrigger>
                            <SelectContent>
                                {VOICE_OPTIONS.map((voice) => (
                                    <SelectItem key={voice.value} value={voice.value}>
                                        {voice.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Additional Configuration</CardTitle>
                    <CardDescription>
                        Configure additional settings for the voice of your assistant.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium">Background Sound</label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="h-4 w-4 text-muted-foreground" />
                                        </TooltipTrigger>
                                        <TooltipContent>Select background sound type</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Select value={backgroundSound ? 'office' : 'default'} onValueChange={(value) => setBackgroundSound(value === 'office')}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Default" />
                                </SelectTrigger>
                                <SelectContent>
                                    {BACKGROUND_SOUND_OPTIONS.map((sound) => (
                                        <SelectItem key={sound.value} value={sound.value}>
                                            {sound.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium">Input Min Characters</label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="h-4 w-4 text-muted-foreground" />
                                        </TooltipTrigger>
                                        <TooltipContent>Minimum characters required for input</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Input type="number" placeholder="10" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium">Filler Injection Enabled</label>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    This determines whether fillers are injected into the Model output before inputting it into the Voice provider.
                                </p>
                            </div>
                            <Switch checked={fillerInjectionEnabled} onCheckedChange={setFillerInjectionEnabled} />
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium">Speed</label>
                                <p className="text-sm text-muted-foreground">The speed of the voice output.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">Slow</span>
                                <Slider
                                    value={[speed]}
                                    onValueChange={([value]) => setSpeed(value)}
                                    max={2}
                                    min={0.5}
                                    step={0.1}
                                    className="flex-1"
                                />
                                <span className="text-sm text-muted-foreground">Fast</span>
                                <div className="w-12 h-8 rounded bg-muted flex items-center justify-center">
                                    <span className="text-sm">{speed}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

