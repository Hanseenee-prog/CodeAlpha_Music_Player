import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';
import PlayLists from './Pages/PlayLists';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="playlists" element={<PlayLists />} />
            </Route>
        </Routes>
    )
}

export default App;