'use client'
import React, { useState } from 'react'
import { z } from 'zod'
import prisma from '../../../prisma'

function ContactPage() {

    const Email = z.object({
        email: z.string().min(3).email()
    })
    const Message = z.object({
        message: z.string().min(4)
    })

    type EmailType = z.infer<typeof Email>
    type MessageType = z.infer<typeof Message>

    const [email, setEmail] = useState<EmailType>()
    const [message, setMessage] = useState<MessageType>()

    const [initialEmail, setInitialEmail] = useState('')
    const [initialMessage, setInitialMessage] = useState('')

    async function putToDatabase() {
        try {
            const validEmail = Email.parse(initialEmail)
            const validMessage = Message.parse(initialMessage)
            setEmail(validEmail)
            setMessage(validMessage)
            await connectToDatabase()
            const user = await prisma.feedback.create({
                data: {
                    email,
                    message
                }
            })
            console.log(user)
        } catch (error) {
            console.log(error)
            throw new Error('Error')
        } finally {
            await prisma.$disconnect()
        }
    }

    return (
        <div className="max-w-7xl mx-auto space-y-2">
            <input onChange={(e) => setInitialEmail(e.target.value)} className='w-full h-[5rem]' type="email" placeholder='email' />
            <input onChange={(e) => setInitialMessage(e.target.value)} className='w-full h-[5rem]' type="text" placeholder='message' />
            <button onClick={() => putToDatabase()} className='p-4 bg-white rounded-md'>Send</button>
        </div>
    )
}

export default ContactPage