import { useEffect, useState } from 'react';
import axios from 'axios'
import AudioPlayer from './AudioPlayer';


const SearchBar = () => {
    const [artists, setArtists] = useState([])
    const [search, setSearch] =useState('')
    
    const spanClick = () => {
        
    };

    const getArtists = (artists) => {

        if (!search || search.trim().length < 1) return;
        axios.get(`https://itunes.apple.com/search?term=${search}&entity=song&origin=*`)
        .then((response) => {
            setArtists(response.data.results);
            console.log(response.data.results[0]);
            console.log(artists)
        })
        .catch((error) =>  {
            console.error('Помилка при отриманні треку: ', error)
        })
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            getArtists();
        }, 500);

        return () => clearTimeout(debounce);
    }, [search]);

    return(
        <div>
            <form className='SearchBar'>
                <div className='search'>
                    <span onClick={spanClick} className="search-icon material-symbols-outlined">search</span>
                    <input placeholder='search' 
                    className='search-input' 
                    type='text' 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}>
                    </input>
                </div>
            </form>
            <div className="ResultChild">
                <ul>
                 {
                artists.slice(0, 5).map((artist) => {
                    return (    
                        <li key={artist.trackId}>
                            <div className="track-text">
                                <span className="track-name">{artist.trackName}</span>
                                <span className="artist-name">{artist.artistName}</span>
                            </div>
                        <AudioPlayer src={artist.previewUrl} />
                    </li>
                    );
                })
            }
            </ul>
        </div>
    </div>
    )
}

export default SearchBar;