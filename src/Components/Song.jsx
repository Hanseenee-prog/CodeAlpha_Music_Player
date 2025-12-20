const Song = ({ song, onPlay }) => {
    const { title, artist, duration } = song;
    
    return (
        <div 
            className="bg-white p-4 my-2 flex justify-between w-full"
            onClick={onPlay}
        >
            <div className="flex">
                <img 
                    src='../public/image.webp'
                    alt='song image'
                    className="w-10 mx-2 "
                />
                <div>
                    <h2 className="text-[16px] font-bold">{title}</h2>
                    <p className="text-[14px]">{artist}</p>
                </div>
            </div>

            <span className="justify-self-end">{duration}</span>
        </div>
    );
}

export default Song;