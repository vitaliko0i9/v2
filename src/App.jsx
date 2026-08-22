import Header from './Header.jsx'
import Body from './Body.jsx'
import AlbumWall from './AlbumWall.jsx'; 
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import AlbumPage from './AlbumPage.jsx'

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
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/album/:id' element={<AlbumPage />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App
