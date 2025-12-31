"use client";

import { Play, Bookmark, Eye, Star, ArrowRight } from "lucide-react";

interface Video {
  id: number;
  title: string;
  youtubeId: string;
  description: string;
  thumbnail: string;
  level: string;
  views: string;
  likes: string;
  date: string;
  category?: string;
  instructor?: string;
  rating?: number;
}

interface VideoCardProps {
  video: Video;
  isBookmarked: boolean;
  onSelect: (index: number) => void;
  onBookmark: (videoId: number) => void;
  index: number;
}

export default function VideoCard({ 
  video, 
  isBookmarked, 
  onSelect, 
  onBookmark, 
  index 
}: VideoCardProps) {
  return (
    <div
      className="bg-blue-700 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer group"
      onClick={() => onSelect(index)}
    >
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="object-fill w-full h-48"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-green-500 rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform">
            <Play size={24} fill="white" />
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onBookmark(video.id);
            }}
            className="bg-black/60 p-2 rounded-full hover:bg-black/80 transition-colors"
          >
            <Bookmark 
              size={16} 
              fill={isBookmarked ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{video.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{video.instructor}</span>
        </div>
      </div>
    </div>
  );
}