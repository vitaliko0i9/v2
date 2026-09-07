import { useState, useEffect } from "react";

function LyricsPage() {
  const [lyrics, setLyrics] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (artist, title) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ artist, title });
      const res = await fetch(`http://127.0.0.1:8000/lyrics?${params}`);
      const data = await res.json();
      setLyrics(data.success ? data.lyrics : "Текст не знайдено");
    } catch (err) {
      console.error("Помилка запиту:", err);
      setLyrics("Помилка завантаження");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => handleSearch("Drake", "One dance")}>
        Знайти текст
      </button>
      {loading && <p>Завантаження...</p>}
      {lyrics && <pre>{lyrics}</pre>}
    </div>
  );
}

export default LyricsPage;