import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

export const RichText = {
    types: {
        image: ({ value }: any) => {
            return (
                <div className="relative w-full h-[300px] md:h-[500px] my-10 mx-auto rounded-xl overflow-hidden shadow-sm bg-gray-100 dark:bg-gray-800">
                    <Image
                        className="object-cover"
                        src={urlFor(value).url()}
                        alt="Blog Post Image"
                        fill
                    />
                </div>
            );
        },
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="ml-6 md:ml-10 py-4 list-disc space-y-3 text-lg text-gray-900 dark:text-gray-300 leading-relaxed marker:text-red-600 dark:marker:text-red-500">{children}</ul>
        ),
        number: ({ children }: any) => (
            <ol className="ml-6 md:ml-10 py-4 list-decimal space-y-3 text-lg text-gray-900 dark:text-gray-300 leading-relaxed marker:text-red-600 dark:marker:text-red-500">{children}</ol>
        ),
    },
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-50 mt-12 mb-6 leading-tight tracking-tight">
                {children}
            </h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-10 mb-5 pb-2 border-b border-gray-200 dark:border-gray-800">
                {children}
            </h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                {children}
            </h3>
        ),
        h4: ({ children }: any) => (
            <h4 className="text-lg md:text-xl font-bold text-red-700 dark:text-red-400 mt-6 mb-3 uppercase tracking-wide">
                {children}
            </h4>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-red-600 dark:border-red-500 pl-6 py-4 my-8 bg-gray-50 dark:bg-gray-900 rounded-r-xl italic text-xl text-gray-700 dark:text-gray-300 leading-relaxed shadow-sm">
                "{children}"
            </blockquote>
        ),
        normal: ({ children }: any) => (
            <p className="text-gray-900 dark:text-gray-300 leading-[2.0] text-lg md:text-xl mb-8 font-normal tracking-wide">
                {children}
            </p>
        ),
    },
    marks: {
        strong: ({ children }: any) => (
            <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>
        ),
        em: ({ children }: any) => (
            <em className="text-gray-800 dark:text-gray-200 italic font-medium">{children}</em>
        ),
        underline: ({ children }: any) => (
            <u className="underline decoration-2 underline-offset-4 decoration-red-200 dark:decoration-red-900">{children}</u>
        ),
        strike: ({ children }: any) => (
            <s className="line-through text-gray-400 decoration-gray-400 decoration-2">{children}</s>
        ),
        highlight: ({ children }: any) => (
            <span className="bg-yellow-200/70 dark:bg-yellow-500/30 px-1 rounded font-medium text-gray-900 dark:text-gray-100">{children}</span>
        ),
        link: ({ children, value }: any) => {
            const rel = value.href && !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
            return (
                <a
                    href={value.href}
                    rel={rel}
                    className="text-red-700 dark:text-red-400 font-semibold underline decoration-red-200 dark:decoration-red-900 decoration-2 underline-offset-2 hover:decoration-red-600 dark:hover:decoration-red-400 hover:text-red-900 dark:hover:text-red-200 transition-all"
                >
                    {children}
                </a>
            );
        },
    },
};
