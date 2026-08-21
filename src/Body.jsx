import FindMusic from "./FindMusic";

function Body() {
  return(
    <div className="page-overlay">
      <section className="Header">
          <h1>MUSIC</h1>
        </section>
        <section className="search-section">
          <FindMusic/>
      </section>
      <section className="all_h2">
        <h2 /> Музика бере свій початок з...
      </section>

    </div>
  );
}

export default Body