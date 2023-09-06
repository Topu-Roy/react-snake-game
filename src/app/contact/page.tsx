'use client'
import React, { useState } from 'react'
import { z } from 'zod'

function ContactPage() {

    const FeedBackObjType = z.object({
        email: z.string().min(3).email(),
        message: z.string().min(4)
    })

    const [initialFeedbackObject, setInitialFeedbackObject] = useState<z.infer<typeof FeedBackObjType>>({
        email: '',
        message: '',
    })

    async function handelSubmit() {
        const validObject = FeedBackObjType.parse(initialFeedbackObject);
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: validObject.email, message: validObject.message }),
            });

            if (response.ok) {
                // Handle success, e.g., show a success message
                console.log('Feedback submitted successfully');
            } else {
                // Handle error, e.g., show an error message
                console.error('Failed to submit feedback');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <div className="max-w-7xl mx-auto space-y-2">
            <input onChange={(e) => setInitialFeedbackObject(prev => ({ ...prev, email: e.target.value }))} className='w-full h-[5rem]' type="email" placeholder='email' />
            <input onChange={(e) => setInitialFeedbackObject(prev => ({ ...prev, message: e.target.value }))} className='w-full h-[5rem]' type="text" placeholder='message' />
            <button onClick={() => handelSubmit()} className='p-4 bg-white rounded-md'>Send</button>
        </div>
    )
}

export default ContactPage