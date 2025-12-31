"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });
const { Document, Page } = dynamic(() => import("react-pdf"), { ssr: false });

const books = {
  "javascript-basics": "/books/js-basics.pdf",
  "react-guide": "/books/react-guide.pdf"
};

export default function BookViewer() {
  const { slug } = useParams();
  const pdfFile = books[slug];
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (!pdfFile) return <div className="p-10 text-xl">Book not found.</div>;

  return (
    <div className="flex justify-center p-10">
      <HTMLFlipBook width={500} height={700}>
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={500}
            />
          ))}
        </Document>
      </HTMLFlipBook>
    </div>
  );
}