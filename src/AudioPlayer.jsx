import { useYoutubePlayer } from "./YoutubePlayerContext";
import useYoutubeAPI from "./useYoutubeAPI";

const AudioPlayer = ({ artist, title, trackId }) => {
    const { 
        playVideo, 
        pauseVideo, 
        resumeVideo, 
        currentTrackId, 
        setCurrentTrackId, 
        pausedTrackId, 
        setPausedTrackId 
    } = useYoutubePlayer();
    
    const { getMusic } = useYoutubeAPI();

    const isPlaying = currentTrackId === trackId;

    const handleClick = async () => {
        if (currentTrackId === trackId) {
            pauseVideo();
            setPausedTrackId(trackId);
            setCurrentTrackId(null);
        } else if (pausedTrackId === trackId) {
            resumeVideo();
            setCurrentTrackId(trackId);
            setPausedTrackId(null);
        } else {
            const id = await getMusic(artist, title);
            if (id) {
                playVideo(id);
                setCurrentTrackId(trackId);
                setPausedTrackId(null);
            }
        }
    };

    return (
        <div className="track-text">
            <button className="play-btn" onClick={handleClick}>
                {isPlaying ? '⏸' : '▶'}
            </button>
        </div>
    );
};

export default AudioPlayer;