"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { socialLinks } from "./Constants";
import Image from "next/image";

const FeedBackSchema = z.object({
    email: z.string().min(3).email(),
    message: z.string().min(4),
});

type FeedBackType = z.infer<typeof FeedBackSchema>;

function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

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
            console.error("An error occurred:", error);
        }
        reset();
    }

    // * This is for the success indicator
    // * This will trigger the state but 3 seconds after
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setSubmitted(false);
        }, 3000);

        () => clearTimeout(timeOut);
    }, [submitted]);

    return (
        <>
            {/* Headline */}
            <h3 className="max-w-7xl text-slate-200/75 font-bold text-4xl text-center mt-8 mx-auto">
                Let's Get In Touch 🎉
            </h3>

            {/* Main Section */}
            <div className="text-white/80 max-h-screen max-w-7xl py-8 mx-auto flex justify-center items-start gap-8">
                {/* Contact Form */}
                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold w-full pb-4">
                        Leave a message
                    </h2>
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
                            className="p-4 w-full mt-2 bg-white/80 text-gray-900/80 rounded-md hover:bg-white/70 ring-gray-900/80 focus:right-1 focus-visible:ring-1 focus-within:right-2"
                        >
                            {isSubmitting
                                ? "Sending Message"
                                : submitted
                                    ? "Message Sent ✔️"
                                    : "Send Message"}
                        </button>
                    </form>
                </div>

                <div className="flex flex-col justify-between items-start">
                    <h2 className="text-2xl font-semibold w-full pb-4">
                        Or, Contact me on
                    </h2>

                    {socialLinks.map((item) => (
                        <a href={item.link} target="_blank">
                            <button className="w-[15rem] flex justify-between px-8 items-center py-2 bg-gray-500/60 rounded-lg mb-2 gap-4 hover:bg-gray-500/50">

                                <Image
                                    src={item.image}
                                    alt="Freelancer Topu Roy"
                                    height={50}
                                    width={50}
                                    className="rounded-full"
                                />
                                <div className="flex-1 text-start flex justify-between items-end">
                                    <span>{item.name}</span>
                                    <Image
                                        src={"/link-arrow.png"}
                                        alt="topu roy web developer"
                                        height={25}
                                        width={25}
                                        className="-rotate-45"
                                    />
                                </div>
                            </button>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ContactPage;
