"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const FeedBackSchema = z.object({
    email: z.string().min(3).email(),
    message: z.string().min(4),
});

type FeedBackType = z.infer<typeof FeedBackSchema>;

function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [isErrorOnSubmit, setIsErrorOnSubmit] = useState(false);

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FeedBackType>({
        resolver: zodResolver(FeedBackSchema),
    });

    async function onSubmit(data: FeedBackType) {
        try {
            const response = await fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    message: data.message,
                }),
            });

            if (response.ok) {
                setSubmitted(true);
            }
        } catch (error) {
            setIsErrorOnSubmit(true);
        }
        reset();
    }

    // * This is for the success indicator
    // * This will trigger the state but 3 seconds after
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setSubmitted(false);
        }, 3000);

        return () => clearTimeout(timeOut);
    }, [submitted]);

    // * This is for the error indicator
    // * This will trigger the state but 3 seconds after
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setIsErrorOnSubmit(false);
        }, 3000);

        return () => clearTimeout(timeOut);
    }, [submitted]);

    return (
        <div className="flex flex-col">
            <h2 className="text-2xl font-semibold w-full pb-4">Leave a message</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-7xl flex flex-col mx-auto space-y-2 ring-2 p-4 rounded-md"
            >
                <span>Your email address:</span>
                <input
                    {...register("email", {
                        required: "Email is required",
                    })}
                    className={`w-[25rem] h-[4rem] px-2 py-1 rounded-lg bg-slate-600/40 text-white/70 ${errors.email && "ring-2 ring-red-500/90"
                        }`}
                    type="email"
                />
                <span
                    className={`text-red-500/70 ${errors.email ? "opacity-100" : "opacity-0"
                        }`}
                >
                    Please give a valid email address
                </span>
                <span>Your Message:</span>
                <div className="w-[25rem] h-[15rem]">
                    <textarea
                        {...register("message", {
                            required: "Email is required",
                        })}
                        style={{ verticalAlign: "top" }}
                        className={`w-full h-full p-2 rounded-lg bg-slate-600/40 text-white/70 ${errors.message && "ring-2 ring-red-500/90"
                            }`}
                    />
                </div>
                <span
                    className={`text-red-500/70 ${errors.message ? "opacity-100" : "opacity-0"
                        }`}
                >
                    Please type your message
                </span>

                <button
                    type="submit"
                    // * Conditional styles
                    className={twMerge(
                        clsx(
                            "p-4 w-full mt-2 rounded-md ring-gray-900/80 focus:right-1 focus-visible:ring-1 focus-within:right-2",
                            {
                                "bg-yellow-100/70 text-gray-800/70 cursor-not-allowed": isSubmitting,
                                "bg-red-400/60 text-gray-800/70 hover:bg-red-400/50": isErrorOnSubmit,
                                "bg-green-200/70 text-gray-800/70 hover:bg-green-200/60": submitted,
                                "bg-white/80 text-gray-900/80 hover:bg-white/70": !isSubmitting && !submitted && !isErrorOnSubmit,
                            }
                        )
                    )}
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Sending Message"
                        : submitted
                            ? "Thanks For The Message"
                            : isErrorOnSubmit
                                ? "Something Went Wrong"
                                : "Send Message"}
                </button>
            </form>
        </div>
    );
}

export default ContactForm;
