import React from "react";

type Position = {
    position: "fixed" | "nofixed";
};

export default function Footer({ position }: Position) {
    return (
        <>
            {position === "fixed" ? (
                <footer className={`bg-gray-700 md:fixed bottom-0 left-0 right-0 w-full`}>
                    <section className="max-w-7xl mx-auto py-4 md:py-4">
                        <p className="text-center w-full text-sm md:text-base text-white/70">
                            Made With ❤️ By Topu Roy
                        </p>
                    </section>
                </footer>
            ) : (
                <footer className={`bg-gray-700 w-full`}>
                    <section className="max-w-7xl mx-auto py-4 md:py-4">
                        <p className="text-center w-full text-sm md:text-base text-white/70">
                            Made With ❤️ By Topu Roy
                        </p>
                    </section>
                </footer>
            )}
        </>
    );
}
