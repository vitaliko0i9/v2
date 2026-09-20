import { data, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AudioPlayer from "./AudioPlayer";
import Trynumber1 from "./Trynumber1";
import UseSong from "./Meanings";
import useYoutubeAPI from "./NewPage";

function AlbumPage() {

    const { id } = useParams();
    const [ albums, setAlbums] = useState(null);
    const [ tracks, setTracks] = useState([]);
    const [ ActiveLyrics, setActiveLyrics ] = useState(null);
    const [currentTrackId, setCurrentTrackId] = useState(null);
    const [ activeIndex, setActiveIndex ] = useState(null);
    const { videoId, getMusic } = useYoutubeAPI();

    const handlePlayToggle = (trackId) => {
        setCurrentTrackId(prev => (prev === trackId ? null : trackId));
    };

    useEffect(() => {
        const getTracks = async () => {
            try {
                const response = await axios.get(
                    `https://itunes.apple.com/lookup?id=${id}&entity=song`
                );
                const songs = response.data.results.filter(
                    item => item.wrapperType === "track"
                );
                setTracks(songs);
            } catch (error) {
                console.log("Помилка в: ", error)
            }
        };
        getTracks()
    }, [id])

    useEffect(() => {
        fetch("/src/albums.json")
        .then(response => response.json())
        .then(data => {
            const foundAlbum = data.find(
                albums => String(albums.collectionId) === id
            );
            setAlbums(foundAlbum)
        })
    }, [id]);

    if(!albums){
        return <h1>Album not found</h1>
    }
    
    return(
        <div>
            <div className="album-page-wrapper">
                <div className="album-preview">
                    <img
                        src={albums.artworkUrl100.replace("100x100", "300x300")}
                        alt={albums.collectionName}
                        />
                    <h1>{albums.collectionName}</h1>
                    <h2>{albums.artistName}</h2>
                </div>
                <div className="track-info">
                    <ul style={{ gridTemplateRows: `repeat(${Math.ceil(tracks.length / 2)}, 1fr)` }}>
                        {tracks.map((track) => (
                            <li>
                                <AudioPlayer
                                    src={track.previewUrl}
                                    isPlaying={currentTrackId === track.trackId}
                                    onPlayToggle={() => handlePlayToggle(track.trackId)}
                                />
                                    <h2>{track.trackName}</h2>
                                    <button onClick={() => setActiveLyrics(track)} >☰</button>
                                    <button onClick={() => getMusic(track.artistName, track.trackName)}>▶</button> 
                            </li>
                        ))}
                    </ul>
                </div>
            </div>{/* style this part */}
                <aside className={`aside-left ${ActiveLyrics ? "open" : "close"}`}>
                        {ActiveLyrics && (
                            <>
                            <button onClick={() => setActiveLyrics(null)}>Закрити</button>
                            <UseSong artist={ActiveLyrics.artistName} title={ActiveLyrics.trackName} onOpenAnnotation={setActiveIndex}/>
                            </>
                        )}
                </aside>
                <aside className={`aside-right ${activeIndex ? "open" : "disactive"}`}>
                    {activeIndex && <p>{activeIndex.explanation}</p>}
                </aside>
        </div>
    )
}

export default AlbumPage;
