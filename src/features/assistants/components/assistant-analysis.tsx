import { Label } from "@/components/ui/label";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { FormValues } from "../types/assistant-analysis";
export const RUBRIC_TYPES = [
    {
        id: "AutomaticRubric",
        title: "AutomaticRubric",
        description: "Automatically break down evaluation into several criteria, each with its own score."
    },
    {
        id: "NumericScale",
        title: "NumericScale",
        description: "A scale of 1 to 10."
    },
    {
        id: "DescriptiveScale",
        title: "DescriptiveScale",
        description: "A scale of Excellent, Good, Fair, Poor."
    },
    {
        id: "Checklist",
        title: "Checklist",
        description: "A checklist of criteria and their status."
    },
    {
        id: "Matrix",
        title: "Matrix",
        description: "A grid that evaluates multiple criteria across different performance levels."
    },
    {
        id: "PercentageScale",
        title: "PercentageScale",
        description: "A scale of 0% to 100%."
    },
    {
        id: "LikertScale",
        title: "LikertScale",
        description: "A scale of Strongly Agree, Agree, Neutral, Disagree, Strongly Disagree."
    }
]


const AssistantAnalysisForm = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            summary: {
                prompt: "",
                timeout: 30
            },
            evaluation: {
                prompt: "",
                rubric: "AutomaticRubric",
                timeout: 30
            },
            structuredData: {
                prompt: "",
                timeout: 30,
                properties: []
            }
        }
    })

    const { fields, append } = useFieldArray({
        control: form.control,
        name: "structuredData.properties"
    })

    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Summary</CardTitle>
                    <CardDescription>
                        This is the prompt that&apos;s used to summarize the call. The output is stored in call.analysis.summary. You can also find the summary in the Call Logs Page.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Prompt</Label>
                        <Textarea
                            placeholder="You are an expert note-taker. You will be given a transcript of a call. Summarize the call in 2-3 sentences, if applicable."
                            {...form.register("summary.prompt")}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Summary request timeout in seconds.</Label>
                        <div className="flex items-center gap-4 w-80">
                            <Slider
                                min={1}
                                max={20}
                                step={1}
                                value={[form.watch("summary.timeout")]}
                                onValueChange={([value]) => form.setValue("summary.timeout", value)}
                                className="flex-1"
                            />
                            <div className="w-12 h-8 rounded bg-muted flex items-center justify-center">
                                <span className="text-sm">{form.watch("summary.timeout")}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Success Evaluation</CardTitle>
                    <CardDescription>
                        Evaluate if your call was successful. You can use Rubric standalone or in combination with Success Evaluation Prompt. If both are provided, they are concatenated into appropriate instructions.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Prompt</Label>
                        <Textarea
                            placeholder="You are an expert call evaluator. You will be given a transcript of a call and the system prompt of the AI participant. Determine if the call was successful based on the objectives inferred from the system prompt."
                            {...form.register("evaluation.prompt")}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Success Evaluation Rubric</Label>
                        <Select
                            value={form.watch("evaluation.rubric")}
                            onValueChange={(value) => form.setValue("evaluation.rubric", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a rubric type" />
                            </SelectTrigger>
                            <SelectContent>
                                {RUBRIC_TYPES.map((rubric) => (
                                    <SelectItem key={rubric.id} value={rubric.id}>
                                        <div className="flex flex-col text-left">
                                            <span>{rubric.title}</span>
                                            <span className="text-sm text-muted-foreground">{rubric.description}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Success evaluation request timeout in seconds.</Label>
                        <div className="flex items-center gap-4 w-80">
                            <Slider
                                min={1}
                                max={20}
                                step={1}
                                value={[form.watch("evaluation.timeout")]}
                                onValueChange={([value]) => form.setValue("evaluation.timeout", value)}
                                className="flex-1"
                            />
                            <div className="w-12 h-8 rounded bg-muted flex items-center justify-center">
                                <span className="text-sm">{form.watch("evaluation.timeout")}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Structured Data</CardTitle>
                    <CardDescription>
                        Extract structured data from call conversation. You can use Data Schema standalone or in combination with Structured Data Prompt. If both are provided, they are concatenated into appropriate instructions.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Prompt</Label>
                        <Textarea
                            placeholder="You will be given a transcript of a call and the system prompt of the AI participant. Extract..."
                            {...form.register("structuredData.prompt")}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Structured data request timeout in seconds.</Label>
                        <div className="flex items-center gap-4 w-80">
                            <Slider
                                min={1}
                                max={20}
                                step={1}
                                value={[form.watch("structuredData.timeout")]}
                                onValueChange={([value]) => form.setValue("structuredData.timeout", value)}
                                className="flex-1"
                            />
                            <div className="w-12 h-8 rounded bg-muted flex items-center justify-center">
                                <span className="text-sm">{form.watch("structuredData.timeout")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-5">
                                <Label>Name</Label>
                            </div>
                            <div className="col-span-4">
                                <Label>Type</Label>
                            </div>
                            <div className="col-span-3">
                                <Label>Required</Label>
                            </div>
                        </div>
                        {fields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-12 gap-4">
                                <div className="col-span-5">
                                    <Input
                                        {...form.register(`structuredData.properties.${index}.name`)}
                                        placeholder="Property name"
                                    />
                                </div>
                                <div className="col-span-4">
                                    <Select
                                        value={form.watch(`structuredData.properties.${index}.type`)}
                                        onValueChange={(value) =>
                                            form.setValue(`structuredData.properties.${index}.type`, value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Boolean">Boolean</SelectItem>
                                            <SelectItem value="String">String</SelectItem>
                                            <SelectItem value="Number">Number</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="col-span-3 flex items-center justify-center">
                                    <Checkbox
                                        checked={form.watch(`structuredData.properties.${index}.required`)}
                                        onCheckedChange={(checked) =>
                                            form.setValue(`structuredData.properties.${index}.required`, checked as boolean)
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                append({
                                    name: "",
                                    type: "String",
                                    required: false
                                })
                            }
                        >
                            Add Property
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Button type="submit">Save Changes</Button>
        </form>
    )
};

export default AssistantAnalysisForm;
