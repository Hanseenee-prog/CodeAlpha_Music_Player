const Song = ({ song }) => {
    const { title, artist } = song;
    
    return (
        <div className="bg-white p-4 my-2 flex">
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
    );
}

export default Song;