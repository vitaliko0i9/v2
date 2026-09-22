import Header from './Header.jsx'
import Body from './Body.jsx'
import AlbumWall from './AlbumWall.jsx'; 
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import AlbumPage from './AlbumPage.jsx'
import Trynumber1 from "./Trynumber1.jsx"
import Meanings from './Meanings.jsx';
import {YoutubePlayerProvider} from './YoutubePlayerContext.jsx';

function Home() {
  return(
    <>
      <AlbumWall></AlbumWall>
      <Header></Header>
      <Body></Body>
      </>
  );
}

function App() {
  return(
    <YoutubePlayerProvider>
      <div id="youtube-player" style={{display: "none"}}></div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/album/:id' element={<AlbumPage />}/>
          <Route path='/try' element={<Trynumber1 />}></Route>
          <Route path='/Meanings' element={<Meanings />}></Route>
        </Routes>
      </BrowserRouter>
    </YoutubePlayerProvider>
  );
}

export default App
