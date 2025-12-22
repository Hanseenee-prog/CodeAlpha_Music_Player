import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';
import PlayLists from './Pages/PlayLists';
import { AudioProvider } from './Contexts/AudioContext';
import NowPlaying from './Pages/NowPlaying';

function App() {
    return (
        <AudioProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='now-playing' element={<NowPlaying />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="playlists" element={<PlayLists />} />
                </Route>
            </Routes>
        </AudioProvider>
    )
}

export default App;