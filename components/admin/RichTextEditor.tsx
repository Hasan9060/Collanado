"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => (
        <div className="h-64 w-full bg-gray-50 animate-pulse rounded-xl border border-gray-200" />
    ),
});

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "clean"],
            [{ color: [] }, { background: [] }],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "color",
        "background",
    ];

    return (
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 focus-within:border-red-500 transition-colors">
            <QuillEditor
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                className="min-h-[300px]"
            />
            <style jsx global>{`
                .ql-toolbar.ql-snow {
                    border: none;
                    border-bottom: 1px solid #e5e7eb;
                    background: #f9fafb;
                    padding: 0.75rem;
                }
                .ql-container.ql-snow {
                    border: none;
                    font-family: inherit;
                    font-size: 1.125rem;
                }
                .ql-editor {
                    min-height: 300px;
                    padding: 1.5rem;
                }
                .ql-editor.ql-blank::before {
                    color: #9ca3af;
                    font-style: normal;
                }
            `}</style>
        </div>
    );
}
