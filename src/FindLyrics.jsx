import { useState, useEffect } from 'react';

function useLyrics(artist, title) {
  const [lyrics, setLyrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!artist || !title) return;

    const controller = new AbortController();

    async function fetchLyrics() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ artist, title });
        const response = await fetch(
          `http://127.0.0.1:8000/lyrics?${params}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Помилка сервера: ${response.status}`);
        }

        const data = await response.json();
        setLyrics(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchLyrics();

    return () => controller.abort();
  }, [artist, title]);

  return { lyrics, loading, error };
}

export default useLyrics;