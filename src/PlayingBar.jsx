import { useContext, createContext, useRef } from "react";
import { useYoutubePlayer } from "./YoutubePlayerContext";
import useYoutubeAPI from "../../backend/useYoutubeAPI";


const contextBar = createContext(null);

const AudioPlayer = () => {
    const { 
        playVideo, 
        pauseVideo, 
        resumeVideo, 
        currentTrackId, 
        setCurrentTrackId, 
        pausedTrackId, 
        setPausedTrackId 
    } = useYoutubePlayer();

export function PlayingBar({children}) {
    const barPlayer = useRef(null);
    const {playMusic} = useYoutubeAPI();
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

    return(
        <div>

        </div>
    )

}

export function useYoutubePlayer() {
    return useContext(contextBar);
}