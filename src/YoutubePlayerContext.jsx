import { func } from "prop-types";
import {createContext, useContext, useEffect, useRef, useState } from "react";

const YoutubePlayerContext = createContext(null);

export function YoutubePlayerProvider({children}) {
    const playerRef = useRef(null);
    const [ isReady, setIsReady] = useState(false);
    const [ currentTrackId, setCurrentTrackId] = useState(null);
    const [ pausedTrackId, setPausedTrackId] = useState(null);

    useEffect(() => {
        if(window.YT) {
            setIsReady(true);
            return;
        }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
        setIsReady(true);
        };
    }, []);

    useEffect(() => {
        if (!isReady) return;
        if (playerRef.current) return;

            playerRef.current = new window.YT.Player("youtube-player", {
                heigth: "0",
                width: "0",
                events: {
                    onReady: () => console.log("Youtube player готовий"),
                },
            });
        }, [isReady]);

        const playVideo = (videoId) => {
            if (playerRef.current && playerRef.current.loadVideoById) {
                playerRef.current.loadVideoById(videoId);    
            }
        };

        const resumeVideo = () => {
            if (playerRef.current && playerRef.current.playVideo){
                playerRef.current.playVideo();
            }
        };

        const pauseVideo = () => {
            if (playerRef.current && playerRef.current.pauseVideo) {
                playerRef.current.pauseVideo();
            }
        };

    return (
        <YoutubePlayerContext.Provider value=
        {{ playVideo, pauseVideo, resumeVideo,
            currentTrackId, setCurrentTrackId,
            pausedTrackId, setPausedTrackId
        }}>
            {children}
        </YoutubePlayerContext.Provider>   
    );
}

export function useYoutubePlayer() {
    return useContext(YoutubePlayerContext);
}