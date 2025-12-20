import Song from "./Song";
import '../index.css';

const Library = () => {
    const songs = [
        { title: "Song A", artist: "Artist 1", album: "Album X" },
        { title: "Song B", artist: "Artist 2", album: "Album Y" },
        { title: "Song C", artist: "Artist 3", album: "Album Z" },
        { title: "Song D", artist: "Artist 4", album: "Album W" },
        { title: "Song E", artist: "Artist 5", album: "Album V" },
        { title: "Song F", artist: "Artist 6", album: "Album U" },
        { title: "Song G", artist: "Artist 7", album: "Album T" },
        { title: "Song H", artist: "Artist 8", album: "Album S" },
        { title: "Song I", artist: "Artist 9", album: "Album R" },
        { title: "Song J", artist: "Artist 10", album: "Album Q" }
    ];

    return (
        <section className="relative my-5">
            <div className="sticky">
                <h1 className="text-3xl font-bold">Your Library</h1>
                <p className="text-xl">Manage your music collection</p>
            </div>

            <div className="flex flex-col overflow-y-scroll h-60">
                <div className="flex flex-col">
                    {songs.map((song, index) => (
                        <Song key={index} song={song} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Library;