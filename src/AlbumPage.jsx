import { data, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AudioPlayer from "./AudioPlayer";


function AlbumPage() {

    const { id } = useParams();
    const [ albums, setAlbums] = useState(null);
    const [ tracks, setTracks] = useState([]);

    const [currentTrackId, setCurrentTrackId] = useState(null);

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
                <ul>
                {tracks.map((track) => (
                    <li>
                        <AudioPlayer
                            //className={style.play-btn}
                            src={track.previewUrl}
                            isPlaying={currentTrackId === track.trackId}
                            onPlayToggle={() => handlePlayToggle(track.trackId)}
                        />
                        <h2>{track.trackName}</h2>
                    </li>
                ))}
                </ul>
            </div>
          </div>
    )
}
export default AlbumPage;
