"use client";

import { useState } from "react";
import VideoCard from '@/components/movie/VideoCard';
import VideoPlayer from '@/components/movie/VideoPlayer';
import { videos, categories } from '@/components/movie/types/data/videos';


export default function CinemaPro() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("lessons");
  const [bookmarkedVideos, setBookmarkedVideos] = useState<number[]>([]);

  const handleVideoSelect = (index: number) => {
    setSelectedVideo(index);
  };

  const handleVideoClose = () => {
    setSelectedVideo(null);
  };

  const toggleBookmark = (videoId: number) => {
    setBookmarkedVideos(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-green-400 to-blue-400 bg-clip-text text-transparent">
            Learn English Through Movies
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Master real-world English with authentic movie scenes and professional lessons
          </p>
        </section>

        {/* Categories */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === category.toLowerCase()
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Video Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              isBookmarked={bookmarkedVideos.includes(video.id)}
              onSelect={handleVideoSelect}
              onBookmark={toggleBookmark}
            />
          ))}
        </section>
      </main>

      {/* Video Player */}
      {selectedVideo !== null && (
        <VideoPlayer
          video={videos[selectedVideo]}
          onClose={handleVideoClose}
        />
      )}
    </div>
  );
}