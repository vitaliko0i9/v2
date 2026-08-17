import FindMusic from "./FindMusic";

function Body() {
  return(
    <div className="page-overlay">
        <section className="Header">
          <h1 className="Header">MUSIC</h1>
        </section>
        <section className="search-section">
          <FindMusic/>
      </section>
    </div>
  );
}

export default Body