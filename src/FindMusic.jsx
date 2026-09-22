import { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import UseSong from "./Meanings";

function FindMusic() {
    const [name, setName] = useState('')
    const [music, setMusic] = useState([])
    const [ ActiveLyrics, setActiveLyrics ] = useState(null);
    const [currentTrackId, setCurrentTrackId] = useState(null);
    const [ activeIndex, setActiveIndex ] = useState(null);

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
            <ul> {/* style this part */}
                {(ActiveLyrics ? [ActiveLyrics] : music.slice(0, 5)).map((track) => (
                    <li key={track.trackId}>
                        <img src={track.artworkUrl100}
                        className="track-image"
                        alt={track.trackName}/>
                        <div className="track-info"> 
                        <strong>{track.trackName}</strong>
                        <span>{track.artistName}</span>
                        </div>
                        <AudioPlayer 
                            artist={track.artistName} 
                            title={track.trackName} 
                            trackId={track.trackId} 
                        />
                    </li>
                ))}
            </ul>            
            <div className={`from-down ${ActiveLyrics ? "open" : "close"}`}>
                        {ActiveLyrics && (
                            <>
                            <button 
                            onClick={() => setActiveLyrics(null)}
                            >
                                Закрити
                            </button>
                            <UseSong 
                            artist={ActiveLyrics.artistName} 
                            title={ActiveLyrics.trackName} 
                                onOpenAnnotation={setActiveIndex}
                                />
                                </>
                            )}
                    </div>
                    {/* <form className={`aside-right ${activeIndex ? "open" : "disactive"}`}>
                        {activeIndex && <p>{activeIndex.explanation}</p>}
                    </form> */}
        </div>
    </div>
    )
};

export default FindMusic;
