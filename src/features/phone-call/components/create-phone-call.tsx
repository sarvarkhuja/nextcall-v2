// src/components/PhoneCallModal/PhoneCallModal.jsx

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select } from '@radix-ui/react-select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import axios from '@/lib/axios';
import axiosInstance from '@/lib/axiosInstance';
import { Assistant } from '@/features/assistants/types/assistant';

// Define type for form data
interface PhoneCallFormData {
    assistant: string;
    phoneNumber: string;
}

const PhoneCallModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [assistants, setAssistants] = useState<Assistant[]>([]);
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<PhoneCallFormData>();

    async function fetchAssistants() {
        const response = await axiosInstance.get('/assistant');
        setAssistants(response.data);
    }

    useEffect(() => {
        fetchAssistants();
    }, []);

    // Handle form submission
    const onSubmit = async (data: PhoneCallFormData) => {
        setIsLoading(true);
        try {
            console.log(data);
            await axiosInstance.post('/call', {
                assistantId: data.assistant,
                customer: {
                    number: data.phoneNumber
                },
                phoneNumberId: "2dcf7075-eaa7-4471-9eeb-f35aa5e733ae"
            });

            toast({
                title: "Success",
                description: "Phone call initiated successfully",
                variant: "default",
            });

            setIsOpen(false);
            reset();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to initiate phone call. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Button to Open Modal */}
            <div className="flex mt-8 mx-4 justify-between items-center">
                <h1 className="text-2xl font-bold">Call History</h1>
                <Button onClick={() => setIsOpen(true)}>Make a Phone Call</Button>
            </div>
            {/* Modal */}
            <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-lg font-medium">Initiate a Phone Call</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Assistant Selection */}
                            <div className="mb-4">
                                <label htmlFor="assistant" className="block text-sm font-medium text-gray-700">
                                    Select Assistant
                                </label>
                                <Select
                                    {...register('assistant', { required: 'Please select an assistant' })}
                                    onValueChange={(value) => setValue('assistant', value)}
                                    
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose an assistant" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {assistants.map((assistant) => (
                                            <SelectItem key={assistant.id} value={assistant.id}>
                                                {assistant.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.assistant && (
                                    <span className="text-red-500 text-sm">{errors.assistant.message?.toString()}</span>
                                )}
                            </div>

                            {/* Phone Number Input with Mask */}
                            <div className="mb-4">
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <Input
                                    {...register('phoneNumber', { required: 'Phone number is required' })}
                                    id="phoneNumber"
                                    type="tel"
                                    defaultValue={'+998'}
                                    placeholder="+998 99 999-99-99"
                                />
                            </div>

                            {/* Submit and Cancel Buttons */}
                            <div className="flex justify-end">
                                <Button type="button" onClick={() => setIsOpen(false)} className="mr-2">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Initiating..." : "Call"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PhoneCallModal;
