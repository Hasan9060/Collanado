"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import {
  Play, Pause, Volume2, VolumeX, Captions, Maximize, Minimize,
  SkipForward, SkipBack, Settings, ChevronLeft, RotateCcw,
  Sparkles, Clock, Zap, Airplay, PictureInPicture, Download,
  Heart, Share2, Bookmark, RotateCw
} from "lucide-react";

interface VideoPlayerProps {
  video: any;
  onClose: () => void;
}

export default function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);
  const [showSkipAnimation, setShowSkipAnimation] = useState<number | null>(null);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape');
  
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  // Enhanced player ready handler
  const handlePlayerReady = useCallback((event: { target: YouTubePlayer }) => {
    const ytPlayer = event.target;
    setPlayer(ytPlayer);
    setDuration(ytPlayer.getDuration());
    setIsLoading(false);
    ytPlayer.setVolume(volume);
    
    // Set initial playback rate
    ytPlayer.setPlaybackRate(playbackRate);
  }, [volume, playbackRate]);

  // Enhanced state change handler
  const handleStateChange = useCallback((event: any) => {
    const state = event.data;
    switch (state) {
      case 1: // Playing
        setIsPlaying(true);
        setIsLoading(false);
        break;
      case 2: // Paused
        setIsPlaying(false);
        break;
      case 3: // Buffering
        setIsLoading(true);
        break;
      case 0: // Ended
        setIsPlaying(false);
        handleVideoEnd();
        break;
    }
  }, []);

  // Progress update with performance optimization
  const handleProgressUpdate = useCallback(() => {
    if (player && duration > 0) {
      const time = player.getCurrentTime();
      setCurrentTime(time);
      setVideoProgress((time / duration) * 100);
    }
  }, [player, duration]);

  // Enhanced skip function with animation
  const skipTime = useCallback((seconds: number) => {
    if (!player || !duration) return;
    
    const newTime = Math.max(0, Math.min(player.getCurrentTime() + seconds, duration));
    player.seekTo(newTime, true);
    setCurrentTime(newTime);
    setVideoProgress((newTime / duration) * 100);
    
    // Show skip animation
    setShowSkipAnimation(seconds);
    setTimeout(() => setShowSkipAnimation(null), 600);
  }, [player, duration]);

  // Enhanced close handler
  const handleClose = useCallback(() => {
    if (player) {
      player.pauseVideo();
      player.destroy();
    }
    
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.warn);
    }
    
    // Reset orientation lock
    try { 
      (screen.orientation as any).unlock(); 
    } catch {}
    
    setIsFullscreen(false);
    onClose();
  }, [player, onClose]);

  // Enhanced fullscreen with orientation lock
  const toggleFullscreen = useCallback(async () => {
    const elem = containerRef.current;
    if (!elem) return;

    try {
      if (!document.fullscreenElement) {
        // Enter fullscreen
        if (elem.requestFullscreen) await elem.requestFullscreen();
        else if ((elem as any).webkitRequestFullscreen) await (elem as any).webkitRequestFullscreen();
        else if ((elem as any).msRequestFullscreen) await (elem as any).msRequestFullscreen();
        
        setIsFullscreen(true);
        
        // Lock orientation to landscape on mobile
        if ((screen as any).orientation && typeof (screen as any).orientation.lock === 'function') {
          try {
            await (screen as any).orientation.lock('landscape');
          } catch (e) {
            console.warn('Orientation lock not supported');
          }
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) await document.exitFullscreen();
        else if ((document as any).webkitExitFullscreen) await (document as any).webkitExitFullscreen();
        else if ((document as any).msExitFullscreen) await (document as any).msExitFullscreen();
        
        setIsFullscreen(false);
        
        // Unlock orientation
        try { 
          (screen.orientation as any).unlock(); 
        } catch {}
      }
    } catch (err) {
      console.warn("Fullscreen error:", err);
    }
  }, []);

  // Theater mode toggle
  const toggleTheaterMode = useCallback(() => {
    setIsTheaterMode(!isTheaterMode);
  }, [isTheaterMode]);

  // Picture in picture (simulated for YouTube)
  const togglePictureInPicture = useCallback(() => {
    setIsPictureInPicture(!isPictureInPicture);
    // Note: Actual PiP requires native video element
  }, [isPictureInPicture]);

  // Volume control
  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (player) {
      player.setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  }, [player]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (isMuted) {
      player?.unMute();
      setIsMuted(false);
    } else {
      player?.mute();
      setIsMuted(true);
    }
  }, [player, isMuted]);

  // Play/pause toggle
  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      player?.pauseVideo();
    } else {
      player?.playVideo();
    }
  }, [isPlaying, player]);

  // Progress bar click handler
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!player || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    player.seekTo(newTime, true);
    setCurrentTime(newTime);
    setVideoProgress((newTime / duration) * 100);
  }, [player, duration]);

  // Format time helper
  const formatTime = useCallback((seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    if (h > 0) {
      return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    }
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }, []);

  // Auto-hide controls with improved logic
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const handleMouseLeave = () => {
      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 1000);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      handleMouseMove();
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      container?.removeEventListener('mousemove', handleMouseMove);
      container?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isPlaying]);

  // Progress update interval
  useEffect(() => {
    const interval = setInterval(handleProgressUpdate, 1000);
    return () => clearInterval(interval);
  }, [handleProgressUpdate]);

  // Video end handler
  const handleVideoEnd = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.warn);
    }
    try { 
      (screen.orientation as any).unlock(); 
    } catch {}
  }, []);

  // Enhanced mobile touch controls
  useEffect(() => {
    const videoContainer = containerRef.current;
    if (!videoContainer) return;

    let lastTap = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Double tap detection
      if (now - lastTap < 300) {
        const x = e.changedTouches[0].clientX;
        if (x < window.innerWidth / 2) {
          skipTime(-10);
        } else {
          skipTime(10);
        }
      } else if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10) {
        // Single tap - toggle controls
        setShowControls(prev => !prev);
      }
      
      lastTap = now;
    };

    videoContainer.addEventListener("touchstart", handleTouchStart);
    videoContainer.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      videoContainer.removeEventListener("touchstart", handleTouchStart);
      videoContainer.removeEventListener("touchend", handleTouchEnd);
    };
  }, [skipTime]);

  // Keyboard shortcuts with more options
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipTime(-5);
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipTime(5);
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'KeyT':
          e.preventDefault();
          toggleTheaterMode();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'Escape':
          if (isFullscreen) {
            toggleFullscreen();
          } else {
            handleClose();
          }
          break;
        case 'KeyC':
          e.preventDefault();
          setShowSubtitles(!showSubtitles);
          break;
        case 'Digit0':
        case 'Numpad0':
          e.preventDefault();
          player?.seekTo(0);
          break;
        case 'Digit9':
        case 'Numpad9':
          e.preventDefault();
          player?.seekTo(duration * 0.9);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [
    togglePlayPause, 
    skipTime, 
    toggleFullscreen, 
    toggleMute, 
    handleClose, 
    isFullscreen, 
    showSubtitles,
    toggleTheaterMode,
    player,
    duration
  ]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Orientation detection for mobile
  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    window.addEventListener('resize', handleOrientationChange);
    handleOrientationChange();

    return () => window.removeEventListener('resize', handleOrientationChange);
  }, []);

  // Auto-enter fullscreen on mobile when rotating to landscape
  useEffect(() => {
    if (orientation === 'landscape' && !isFullscreen && window.innerWidth < 768) {
      toggleFullscreen();
    }
  }, [orientation, isFullscreen, toggleFullscreen]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 bg-black flex flex-col justify-center items-center z-50 transition-all duration-300 ${
        isTheaterMode ? 'max-w-6xl mx-auto' : 'inset-0'
      } ${isPictureInPicture ? 'w-96 h-64 bottom-4 right-4 rounded-xl shadow-2xl' : ''}`}
    >
      {/* Skip Animation */}
      {showSkipAnimation && (
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-50 ${
          showSkipAnimation > 0 ? 'bg-green-500/20' : 'bg-yellow-500/20'
        } animate-fadeInOut`}>
          <div className="bg-black/80 rounded-full p-6 flex items-center space-x-3">
            {showSkipAnimation > 0 ? (
              <SkipForward size={32} className="text-green-400" />
            ) : (
              <SkipBack size={32} className="text-yellow-400" />
            )}
            <span className="text-white text-xl font-bold">
              {Math.abs(showSkipAnimation)}s
            </span>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
        </div>
      )}

      <div className={`relative w-full h-full bg-black ${isTheaterMode ? 'aspect-video' : ''}`}>
        <YouTube
          videoId={video.youtubeId}
          onReady={handlePlayerReady}
          onStateChange={handleStateChange}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
              controls: 0,
              rel: 0,
              modestbranding: 1,
              iv_load_policy: 3,
            },
          }}
          className="absolute inset-0 w-full h-full"
        />

        {/* Top Gradient Overlay with Enhanced Header */}
        <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/90 to-transparent transition-all duration-300 ${
          showControls ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}>
          <div className="flex items-center justify-between p-4 md:p-6">
            <button
              onClick={handleClose}
              className="flex items-center space-x-2 bg-black/70 hover:bg-black/90 backdrop-blur-sm p-3 rounded-xl transition-all group hover:scale-105"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium hidden sm:block">Back to Lessons</span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
                <Sparkles size={16} className="text-green-400" />
                <span className="text-sm font-medium">Premium Video</span>
              </div>
              
              <button
                onClick={toggleTheaterMode}
                className={`p-3 rounded-xl transition-all backdrop-blur-sm ${
                  isTheaterMode ? 'bg-green-500 text-white' : 'bg-black/70 hover:bg-black/90'
                }`}
              >
                <Zap size={20} />
              </button>
            </div>
          </div>

          {/* Video Title */}
          <div className="px-6 mt-2">
            <h2 className="text-xl font-bold text-white line-clamp-1">
              {video.title || "Video Lesson"}
            </h2>
            <p className="text-gray-300 text-sm mt-1">
              {video.instructor || "Professional Instructor"}
            </p>
          </div>
        </div>

        {/* Center Play Button with Enhanced Design */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          !isPlaying && showControls ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}>
          <button
            onClick={togglePlayPause}
            className="bg-green-500 hover:bg-green-600 p-8 rounded-full transition-all transform hover:scale-110 shadow-2xl backdrop-blur-sm"
          >
            <Play size={40} fill="white" />
          </button>
        </div>

        {/* Enhanced Bottom Controls */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 md:p-6 transition-all duration-300 ${
          showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          
          {/* Enhanced Progress Bar */}
          <div
            className="h-3 bg-white/20 rounded-full mb-4 cursor-pointer relative group hover:h-4 transition-all"
            onClick={handleProgressClick}
          >
            <div
              className="h-3 bg-green-500 rounded-full absolute top-0 left-0 transition-all group-hover:h-4 group-hover:bg-green-400"
              style={{ width: `${videoProgress}%` }}
            ></div>
            <div
              className="absolute top-1/2 w-5 h-5 bg-green-500 rounded-full transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all shadow-lg border-2 border-white"
              style={{ left: `calc(${videoProgress}% - 10px)` }}
            ></div>
            
            {/* Preview on hover */}
            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-black/90 rounded-lg p-2 text-xs">
              {formatTime((videoProgress / 100) * duration)}
            </div>
          </div>

          {/* Main Control Buttons */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left Controls */}
            <div className="flex items-center space-x-3 md:space-x-4">
              <button
                onClick={togglePlayPause}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all hover:scale-110"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} fill="white" />}
              </button>

              <button
                onClick={() => skipTime(-10)}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all hover:scale-105 hidden sm:block"
                title="Skip back 10 seconds"
              >
                <SkipBack size={20} />
              </button>

              <button
                onClick={() => skipTime(10)}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all hover:scale-105 hidden sm:block"
                title="Skip forward 10 seconds"
              >
                <SkipForward size={20} />
              </button>

              {/* Volume Control */}
              <div 
                className="relative"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <button
                  onClick={toggleMute}
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all hover:scale-105 flex items-center"
                >
                  {isMuted || volume === 0 ? <VolumeX size={20} /> : 
                   volume < 50 ? <Volume2 size={20} /> : <Volume2 size={20} />}
                </button>

                {showVolumeSlider && (
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-xl p-4 w-12 h-32 flex items-center justify-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      className="volume-slider vertical"
                    />
                  </div>
                )}
              </div>

              {/* Time Display */}
              <div className="text-sm text-gray-300 font-medium hidden sm:flex items-center space-x-1">
                <Clock size={16} />
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-3 md:space-x-4">
              {/* Playback Rate */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all hover:scale-105 text-sm font-medium flex items-center space-x-2"
                >
                  <Zap size={16} />
                  <span>{playbackRate}x</span>
                </button>
                
                {showSettings && (
                  <div className="absolute bottom-full mb-2 right-0 bg-gray-800 rounded-xl p-2 min-w-[120px] backdrop-blur-sm border border-gray-600">
                    <div className="text-xs text-gray-400 px-3 py-2 border-b border-gray-700">Playback Speed</div>
                    {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => {
                          setPlaybackRate(rate);
                          player?.setPlaybackRate(rate);
                          setShowSettings(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-between ${
                          playbackRate === rate ? 'bg-green-500 text-white' : 'text-gray-300'
                        }`}
                      >
                        <span>{rate}x</span>
                        {playbackRate === rate && <Zap size={14} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Subtitles */}
              <button
                onClick={() => setShowSubtitles(!showSubtitles)}
                className={`p-3 rounded-xl transition-all hover:scale-105 ${
                  showSubtitles ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Captions size={20} />
              </button>

              {/* Picture in Picture */}
              <button
                onClick={togglePictureInPicture}
                className={`p-3 rounded-xl transition-all hover:scale-105 hidden lg:block ${
                  isPictureInPicture ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <PictureInPicture size={20} />
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all hover:scale-105"
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Quick Actions */}
          <div className="flex items-center justify-between mt-4 sm:hidden">
            <div className="flex items-center space-x-4">
              <button onClick={() => skipTime(-10)} className="text-gray-300">
                <SkipBack size={20} />
              </button>
              <button onClick={() => skipTime(10)} className="text-gray-300">
                <SkipForward size={20} />
              </button>
            </div>
            
            <div className="text-xs text-gray-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>

        {/* Mobile Orientation Hint */}
        {orientation === 'portrait' && window.innerWidth < 768 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30">
            <div className="text-center p-6 max-w-xs">
              <RotateCw size={48} className="mx-auto mb-4 text-green-400 animate-spin" />
              <h3 className="text-white text-lg font-bold mb-2">Rotate for Fullscreen</h3>
              <p className="text-gray-300 text-sm">
                Rotate your device to landscape mode for the best viewing experience
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for vertical volume slider */}
      <style jsx>{`
        .volume-slider.vertical {
          writing-mode: bt-lr;
          -webkit-appearance: slider-vertical;
          width: 8px;
          height: 100px;
        }
        
        @keyframes fadeInOut {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.8); }
        }
        
        .animate-fadeInOut {
          animation: fadeInOut 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}