import { useCallback } from "react";
import { useAudio } from "../Contexts/AudioContext";
import songs from "../data/songs";

const NowPlaying = () => {
    const { nowPlaying } = useAudio();

    const nowPlayingContent = useCallback(() => {
        const { title, artist, album, duration, audioSrc, coverImage } = nowPlaying;
        console.log(nowPlaying)

        return (
            <div className="relative flex flex-row-reverse">
                <aside className="h-60% w-[30%]">
                    <div className="overflow-y-scroll">
                        {songs.map((song, index) => {
                            return (
                                <div
                                    key={index}
                                    className='w-full h-20 cursor-pointer flex flex-col border-2'
                                >
                                    <span>{song.title}</span>
                                    <span>{song.artist}</span>
                                </div>
                            )
                        })
                        }
                    </div>
                </aside>
                
                <div 
                    className='w-full flex flex-col items-center justify-center border-2 border-red-200'>
                    <img 
                        src={coverImage} 
                        alt='Album Art'
                        className={'w-80 aspect-square opacity-0.7'} 
                    />

                    <div>
                        <span>{title}</span>
                        <span>{artist}</span>
                    </div>
                </div>
            </div>
        )
    }, [nowPlaying])

    return nowPlayingContent();
}
 
export default NowPlaying;