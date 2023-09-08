import Image from "next/image";
import { socialLinks } from "./Constants";
import ContactForm from "./contactForm";
import Footer from "@/components/Footer";

function ContactPage() {
    return (
        <>
            {/* Headline */}
            <h3 className="max-w-7xl text-slate-200/75 font-bold text-2xl sm:text-4xl text-center mt-8 mx-auto">
                Let's Get In Touch 🎉
            </h3>

            {/* Main Section */}
            <div className="text-white/80 max-w-7xl py-8 mx-auto flex flex-col md:flex-row justify-center items-center md:items-start gap-2 lg:gap-4 xl:gap-8 md:px-2">
                {/* Contact Form */}
                <div className="w-[94%] sm:w-[30rem] md:w-[30rem] md:flex justify-center items-center flex-col">
                    <ContactForm />
                </div>

                <div className="flex w-full md:w-[20rem] flex-col justify-between items-center sm:items-start">
                    <h2 className="text-2xl text-white/70 font-semibold w-full pb-4 text-center md:text-left">
                        Or, Contact me on
                    </h2>

                    {socialLinks.map((item) => (
                        <a href={item.link} className="w-[94%] sm:w-[30rem] md:w-full mx-auto md:m-0 lg:w-[15rem]" target="_blank">
                            <button className="w-full flex justify-between px-8 items-center py-2 bg-gray-500/60 rounded-lg mb-2 gap-4 hover:bg-gray-500/50">

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
            <Footer position="fixed" />
        </>
    );
}

export default ContactPage;
