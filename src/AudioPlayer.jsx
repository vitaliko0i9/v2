import { useRef, useEffect } from "react";


const AudioPlayer = ({ src, isPlaying, onPlayToggle }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log("Помилка відтворення:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="track-text">
      <audio ref={audioRef} src={src}></audio>
      <button className="play-btn" onClick={onPlayToggle}>
        {isPlaying ? '⏸' : '▶'}
      </button>
    </div>
  );
};

export default AudioPlayer;