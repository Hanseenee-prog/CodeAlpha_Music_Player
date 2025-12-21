import Song from "./Song";
import '../index.css';
import songs from "../data/songs";
import React from "react";
import { useAudio } from "../Contexts/AudioContext";

const Library = React.memo(() => {
    const { playSong } = useAudio();

    return (
        <section className="my-5 sticky top-40">
            <div className="">
                <h1 className="text-2xl font-bold">Your Library</h1>
                <p className="text-[14px]">Manage your music collection</p>
            </div>

            <div className="flex flex-col overflow-y-scroll h-100">
                <div 
                    className="flex flex-col h-20"
                >
                    {songs.map((song, index) => (
                        <Song 
                            key={index} 
                            song={song} 
                            onPlay={() => playSong(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
})

export default Library;