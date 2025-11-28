import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaHeart,
} from "react-icons/fa";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
// import { PiShuffleBold } from "react-icons/pi";


const formatTime = (time: number) => {
  if (Number.isNaN(time) || time < 0) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const AudioPlayer = ({ url }: { url: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLInputElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
    setCurrentTime(value);
  };

  const changePlaybackRate = () => {
    const rates = [0.75, 1, 1.25, 1.5];
    const nextIndex = (rates.indexOf(playbackRate) + 1) % rates.length;
    const newRate = rates[nextIndex];
    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    audioEl.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioEl.addEventListener("timeupdate", handleTimeUpdate);
    audioEl.addEventListener("ended", () => setIsPlaying(false));
    return () => {
      audioEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioEl.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [handleLoadedMetadata, handleTimeUpdate]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);
  //bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400
  return (
    <div className=" flex-1 rounded-xl bg-transparent text-black px-4 ">
      {/* <div className="text-center space-y-3 mb-4">
        <p className="text-lg font-semibold">Tình yêu của anh</p>
      </div> */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-black/80 mb-1">
          <span>{formatTime(currentTime)}</span>
          <button
            className="text-black/90 hover:text-black text-xs border border-black/50 rounded-full px-2 py-0.5"
            onClick={changePlaybackRate}
          >
            {playbackRate.toFixed(2)}x
          </button>
          <span>{formatTime(duration)}</span>
        </div>
        <input
          ref={progressRef}
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full accent-black"
        />
        {/* <div className="h-1 bg-white/30 rounded-full mt-2">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${progress}%` }}
          />
        </div> */}
      </div>
      <div className="flex items-center justify-between text-black/80 text-lg">
        <button className="p-2 hover:text-white transition-colors">
          <FaHeart />
        </button>
        <button className="p-2 hover:text-black transition-colors">
          <FaBackward />
        </button>
        <button
          className="bg-transparent text-black w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg hover:scale-105 transition-transform"
          onClick={togglePlay}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="p-2 hover:text-black transition-colors">
          <FaForward />
        </button>
        <button className="p-2 hover:text-black transition-colors">
          <HiOutlineSpeakerWave />
        </button>
      </div>

      <audio ref={audioRef} src={url} preload="metadata" />
    </div>
  );
};

export default AudioPlayer;
