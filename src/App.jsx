import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';
import PlayLists from './Pages/PlayListsPage';
import PlayList from './Components/PlayList';
import LibraryPage from './Pages/LibraryPage';
import { AudioProvider } from './Contexts/AudioContext';
import { FavsProvider } from './Contexts/FavoritesContext';
import { PlaylistProvider } from './Contexts/PlaylistContext';
import { SearchProvider } from './Contexts/SearchContext';
import NowPlaying from './Pages/NowPlaying';

function App() {
    return (
        <AudioProvider>
            <FavsProvider> 
                <PlaylistProvider>
                    <SearchProvider>                
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path='now-playing' element={<NowPlaying />} />
                                <Route path="library" element={<LibraryPage />} />
                                <Route path="favorites" element={<Favorites />} />
                                <Route path="playlists" element={<PlayLists />} />
                                <Route path="playlists/:id" element={<PlayList />} />
                            </Route>
                        </Routes>
                    </SearchProvider>
                </PlaylistProvider>
            </FavsProvider>
        </AudioProvider>
    )
}

export default App;