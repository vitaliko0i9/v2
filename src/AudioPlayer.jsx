import { useRef, useState } from "react"

const AudioPlayer = ({src}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  const togglePlay = () => {
    if (isPlaying) {
        audioRef.current.pause();
    }
    else {
    audioRef.current.play();
  }
  setIsPlaying(!isPlaying);
};

  return (
    <div className="track-text">
        <audio ref={audioRef} src={src}></audio>
        <button className="play-btn" onClick={togglePlay}>{isPlaying ? '⏸' : '▶'}</button>
    </div>
  );
} 

export default AudioPlayer;