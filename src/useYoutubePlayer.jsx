
import { useEffect, useRef, useState } from "react";


function useYoutubePlayer() {
    const playerRef = useRef(null);
    const [isReady, setIsReady] = useState(null);

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

        const pauseVideo = () => {
            if (playerRef.current && playerRef.current.pauseVideo) {
                playerRef.current.pauseVideo();
            }
        };
    return {playVideo, pauseVideo};
}

export default useYoutubePlayer;