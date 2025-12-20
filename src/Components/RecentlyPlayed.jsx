const RecentlyPlayed = () => {
    const recentlyPlayed = [
        { id: 1, title: "Song A", artist: "Artist A" },
        { id: 2, title: "Song B", artist: "Artist B" },
        { id: 3, title: "Song C", artist: "Artist C" },
        { id: 4, title: "Song D", artist: "Artist D" },
        { id: 5, title: "Song E", artist: "Artist E" },
    ]

    return ( 
        <div className="flex flex-row">
            {recentlyPlayed.map(song => (
                <div 
                    key={song.id}
                    className="card flex flex-col grow justiify-center items-center"
                >
                    <img 
                        src='../public/image.webp' alt='Song image' 
                        className="w-20"
                    />
                    <span>{song.title}</span>
                    <span>{song.artist}</span>
                </div>
            ))}
        </div>
    );
}
 
export default RecentlyPlayed;