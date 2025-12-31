"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GallerySliderProps {
    images: any[];
    title: string;
}

export default function GallerySlider({ images, title }: GallerySliderProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [mainEmblaRef, mainEmblaApi] = useEmblaCarousel({ loop: true });
    const [thumbEmblaRef, thumbEmblaApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
    });

    const onThumbClick = useCallback(
        (index: number) => {
            if (!mainEmblaApi || !thumbEmblaApi) return;
            mainEmblaApi.scrollTo(index);
        },
        [mainEmblaApi, thumbEmblaApi]
    );

    const onSelect = useCallback(() => {
        if (!mainEmblaApi || !thumbEmblaApi) return;
        setSelectedIndex(mainEmblaApi.selectedScrollSnap());
        thumbEmblaApi.scrollTo(mainEmblaApi.selectedScrollSnap());
    }, [mainEmblaApi, thumbEmblaApi]);

    useEffect(() => {
        if (!mainEmblaApi) return;
        onSelect();
        mainEmblaApi.on('select', onSelect);
        mainEmblaApi.on('reInit', onSelect);
    }, [mainEmblaApi, onSelect]);

    const scrollPrev = useCallback(() => mainEmblaApi && mainEmblaApi.scrollPrev(), [mainEmblaApi]);
    const scrollNext = useCallback(() => mainEmblaApi && mainEmblaApi.scrollNext(), [mainEmblaApi]);

    if (!images || images.length === 0) return null;

    return (
        <div className="w-full">
            {/* Main Slider */}
            <div className="relative group rounded-xl overflow-hidden border border-gray-100 bg-gray-50 shadow-sm">
                <div className="overflow-hidden" ref={mainEmblaRef}>
                    <div className="flex touch-pan-y">
                        {images.map((img, index) => (
                            <div className="flex-[0_0_100%] min-w-0 relative aspect-video" key={index}>
                                <Image
                                    src={urlFor(img).url()}
                                    alt={`${title} - Image ${index + 1}`}
                                    fill
                                    className="object-contain bg-gray-900/5"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10"
                    onClick={scrollPrev}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10"
                    onClick={scrollNext}
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Thumbnails */}
            <div className="mt-4">
                <div className="overflow-hidden cursor-grab active:cursor-grabbing p-1" ref={thumbEmblaRef}>
                    <div className="flex gap-3">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className={`flex-[0_0_20%] min-w-0 relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all border-2 ${index === selectedIndex
                                        ? 'border-red-600 ring-2 ring-red-100'
                                        : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                                onClick={() => onThumbClick(index)}
                            >
                                <Image
                                    src={urlFor(img).url()}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
