

function Meanings() {

    const [ meanings, setMeanings] = useState(null)

    const getMeanings = () => {
        if (!artist || !title) return;
        axios.get(`http://127.0.0.1:8000/lyrics?${params}`)
        .then((response) => {
            setMeanings(response.data.results);
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
}

export default Meanings