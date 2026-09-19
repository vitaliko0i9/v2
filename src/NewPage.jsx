import axios from "axios";
import { useEffect, useState } from "react";


function useYoutubeAPI() {
    const [videoId, setVideoId] = useState(null);

    const getMusic = (artist, title) => {
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(artist + " " + title)}&type=video&maxResults=1&key=AIzaSyClWgfuYiTwO-5Lf33zOGI_mNfssSiKkIg`)
        .then((response => {
            setVideoId(response.data.items[0]?.id?.videoId);
            console.log(response.data.items[0].id.videoId);
        }))
    };
    return{videoId, getMusic};
}

export default useYoutubeAPI;