import useLyrics from './FindLyrics'

function TrackLyrics({ artist, title }) {
  const { lyrics, loading, error } = useLyrics(artist, title);

  if (loading) return <p>Завантаження тексту...</p>;
  if (error) return <p>Помилка: {error}</p>;
  if (!lyrics) return null;

  return <pre>{lyrics.lyrics}</pre>;
}
export default TrackLyrics;