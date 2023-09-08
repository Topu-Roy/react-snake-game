import Image from "next/image";
import { socialLinks } from "./Constants";
import ContactForm from "./contactForm";

function ContactPage() {
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
                    <ContactForm />
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
            </div >
        </>
    );
}

export default ContactPage;
