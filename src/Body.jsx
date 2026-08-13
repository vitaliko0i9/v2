import FindMusic from "./FindMusic";

function Body() {
  return(
    <div>
      {/* <section className="BodyBackground">
        <video autoPlay loop muted playsInline className="bg-video">
          <source src="/src/assets/falling_covers_hq.mp4" type="video/mp4"></source>
        </video> 
      </section> */}
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