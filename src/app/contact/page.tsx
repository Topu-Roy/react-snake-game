"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FeedBackSchema = z.object({
    email: z.string().min(3).email(),
    message: z.string().min(4),
});

type FeedBackType = z.infer<typeof FeedBackSchema>

function ContactPage() {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting, isSubmitted },
    } = useForm<FeedBackType>({
        resolver: zodResolver(FeedBackSchema)
    });


    async function onSubmit(data: FeedBackType) {
        // try {
        //     const response = await fetch("/api/feedback", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             email: validObject.email,
        //             message: validObject.message,
        //         }),
        //     });

        //     if (response.ok) {
        //         // Handle success, e.g., show a success message
        //         console.log("Feedback submitted successfully");
        //     } else {
        //         // Handle error, e.g., show an error message
        //         console.error("Failed to submit feedback");
        //     }
        // } catch (error) {
        //     console.error("An error occurred:", error);
        // }


        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl flex flex-col mx-auto space-y-2">
            <input
                {...register('email', {
                    required: 'Email is required',
                })}
                className="w-full h-[5rem]"
                type="email"
                placeholder="email"
            />
            {errors.email ? (<span className="text-red-700/70">Please give a valid email address.</span>) : null}
            <input
                {...register('message', {
                    required: 'Email is required',
                })}
                className="w-full h-[5rem]"
                type="text"
                placeholder="message"
            />
            {errors.message ? (<span className="text-red-700/70">Please type your message.</span>) : null}
            <button
                type="submit"
                className="p-4 bg-white rounded-md"
            >
                Send
            </button>
        </form>
    );
}

export default ContactPage;
