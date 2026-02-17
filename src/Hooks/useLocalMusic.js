import { extractMetadata } from "../utils/extractSongMetadata";
import { get, set } from "idb-keyval";
import { useEffect, useState } from "react";

/* eslint-disable react-hooks/exhaustive-deps */
const useLocalMusic = () => {
    const [deviceSongs, setDeviceSongs] = useState([]);

    // Load saved songs automatically when the app starts.
    useEffect(() => {
        let active = true;

        const loadSongs = async () => {
            try {
                const savedSongs = await get("device-files");

                if (!savedSongs || !active) return;

                if (Array.isArray(savedSongs)) {
                    const hydratedSongs = savedSongs.map(song => {
                        // Generate the playable source from file Blob
                        const audioSrc = URL.createObjectURL(song.file);

                        let coverImage = song.coverImage; // Existing or null
                        if (song.coverImage) coverImage = URL.createObjectURL(song.coverImage);

                        return {
                            ...song, 
                            audioSrc,
                            coverImage
                        }
                    })
                    setDeviceSongs(hydratedSongs);
                };
            } 
            catch (err) {
                console.error("Error loading songs:", err);
            }
        };
        loadSongs();

        return () => {
            deviceSongs.forEach(song => {
                if (song.audioSrc) URL.revokeObjectURL(song.audioSrc);
                if (song.coverImage && song.coverImage.startsWith("blob:")) URL.revokeObjectURL(song.coverImage);
            });
        };
    }, []);


    // Sync the React state (what you see) with the Database (what is saved).

    // Reuse the logic anywhere in your app.


    // Add song(s) to indexedDB
    const addSongs = async (files) => {
        if (!files) return;

        const newSongs = [];

        // Loop through all selected files
        for (const file of files) {
            // 1. Get the metadata
            const meta = await extractMetadata(file);

            // 2. Create the Song Object (Combine file + metadata)
            const song = {
                id: Date.now() + Math.random(), // Unique ID
                file: file, // We store the actual File object for IDB
                audioSrc: URL.createObjectURL(file), // For immediate playback
                status: "device",
                ...meta // Spreads title, artist, coverImage, etc.
            };

            newSongs.push(song);
        }

        // 3. Update State & Database
        setDeviceSongs((prev) => [...prev, ...newSongs]);
        
        // For IDB, we usually don't store the Blob URLs (they expire), 
        // we just store the file and metadata, and regenerate URLs on load.
        // However, storing the extracted metadata saves processing time on next load!
        await set('device-files', [...deviceSongs, ...newSongs]);
    }

    // Remove song(s) from indexedDB
    const removeSongs = () => {

    }

    return {
        deviceSongs, setDeviceSongs,
        addSongs, removeSongs
    }
}

export default useLocalMusic;