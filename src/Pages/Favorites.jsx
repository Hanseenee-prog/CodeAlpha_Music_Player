import { useCallback } from "react";
import { useFavsContext } from "../Contexts/FavoritesContext";
import { Heart } from 'lucide-react';

const Favorites = () => {
    const { favoriteSongs , isFavorite, toggleFavorite} = useFavsContext();

    const renderFavorites = useCallback(() => {
        return (
            <div className="w-full">
                <h2>Favorites</h2>

                <div>
                    {(favoriteSongs.length > 0) ? (
                        (favoriteSongs.map((fav, index) => {
                            return (
                                <div key={`${fav.id}-${index}`} className={`px-4 py-2 border-2`}>
                                    <div>
                                        {fav.title}
                                    </div>
                                    <div onClick={(e) => { e.stopPropagation(); toggleFavorite(fav.id); }}>
                                        <Heart size={20} fill={isFavorite(fav.id) ? 'red' : 'transparent'} />
                                    </div>
                                </div>
                            )
                        }))
                    ) : (
                        <div>
                            <p>Your favorite songs will be displayed here.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }, [favoriteSongs, toggleFavorite, isFavorite])

    return renderFavorites();
}

export default Favorites;