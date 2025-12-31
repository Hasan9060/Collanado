"use client";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { Play, Pause, Maximize2 } from "lucide-react";

export default function CustomVideoPlayer({ url }) {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => setPlaying(!playing);

  const handleFullScreen = () => {
    const iframe = playerRef.current.getInternalPlayer();
    const container = iframe.closest("div");
    if (container.requestFullscreen) container.requestFullscreen();
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-black rounded-xl overflow-hidden shadow-lg">
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        controls={false}
        width="100%"
        height="100%"
        style={{ aspectRatio: "16 / 9" }}
        config={{
          youtube: {
            playerVars: { modestbranding: 1, controls: 0, rel: 0, showinfo: 0 },
          },
        }}
      />

      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md text-white flex items-center justify-between px-4 py-2">
        <button
          onClick={togglePlay}
          className="p-2 hover:bg-white/20 rounded-full transition"
        >
          {playing ? <Pause size={22} /> : <Play size={22} />}
        </button>
        <button
          onClick={handleFullScreen}
          className="p-2 hover:bg-white/20 rounded-full transition"
        >
          <Maximize2 size={20} />
        </button>
      </div>
    </div>
  );
}
