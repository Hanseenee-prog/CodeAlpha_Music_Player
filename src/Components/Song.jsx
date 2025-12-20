const Song = ({ song }) => {
    const { title, artist, album } = song;
    
    return (
        <div className="card bg-white p-4 my-2">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-lg">{artist}</p>
            <p className="text-sm">{album}</p>
        </div>
    );
}

export default Song;