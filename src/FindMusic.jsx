import axios from "axios";
import { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";

function FindMusic() {
    const [name, setName] = useState('')
    const [music, setMusic] = useState([])

    const [currentTrackId, setCurrentTrackId] = useState(null);

    const handlePlayToggle = (trackId) => {
    setCurrentTrackId(prev => (prev === trackId ? null : trackId));
    };

    const getMusic = (e) => {
        axios.get(`https://itunes.apple.com/search?term=${name}&entity=song&origin=*`)
        .then((response) => {
            setMusic(response.data.results);
            console.log(response.data.results[0]);
            console.log(music)
        });
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
            getMusic();
    }, 500); 
        return () => clearTimeout(debounce);
    }, [name]);
    
    return(
        <div>
            <form className="Searchbar">
                <div className={`name ${name ? 'active' : ''}`}>
                <span 
                className="search-icon material-symbols-outlined">search</span>
                <input
                className="search-input" 
                type="text"
                placeholder="Знайти пісню..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                </div>
            </form> 
            <div className="ResultChild">
            <ul>
                {music.slice(0, 5).map((track) => (
                    <li key={track.trackId}>
                        <img src={track.artworkUrl100}
                        className="track-image"
                        alt={track.trackName}/>
                        <div className="track-info"> 
                        <strong>{track.trackName}</strong>
                        <span>{track.artistName}</span>
                        </div>
                        <AudioPlayer
                        src={track.previewUrl}
                        isPlaying={currentTrackId === track.trackId}
                        onPlayToggle={() => handlePlayToggle(track.trackId)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    </div>
    )
};

export default FindMusic;
