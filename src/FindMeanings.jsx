import { useState, useEffect } from 'react';


function SongAnnotations({ artist, title }) {
  const [annotations, setAnnotations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!artist || !title) return;

    setLoading(true);
    const params = new URLSearchParams({ artist, title });
    fetch(`http://127.0.0.1:8000/lyrics/annotations?${params}`)
      .then((res) => res.json())
      .then((data) => setAnnotations(data.annotations || []))
      .finally(() => setLoading(false));
  }, [artist, title]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        {loading && <p>Завантаження...</p>}
        {annotations.map((item, index) => (
          <p
            key={index}
            onClick={() => setSelected(item)}
            style={{ cursor: 'pointer' }}
          >
            {item.fragment}
          </p>
        ))}
      </div>

      {selected && (
        <aside style={{ width: '300px', padding: '16px' }}>
          <button onClick={() => setSelected(null)}>✕</button>
          <h3>{selected.fragment}</h3>
          <div dangerouslySetInnerHTML={{ __html: selected.explanation }} />
        </aside>
      )}
    </div>
  );
}

export default SongAnnotations;