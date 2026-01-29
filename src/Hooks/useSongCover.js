import { useState, useEffect, useRef } from "react";
import { get, set, del } from "idb-keyval";
import { compressImage, validateImage } from "../utils/validateAndCompressImage";
import { fileToBase64 } from "../utils/fileTobase64";

/* 
    * coverSrc:
    * - ObjectURL (temporary preview)
    * - Base64 (storage)
*/
export const useSongCover = (songId, fallbackCover) => {
    const [coverSrc, setCoverSrc] = useState(fallbackCover);
    const [error, setError] = useState(null);
    const objectURLRef = useRef(null);

    useEffect(() => {
        let active = true;

        const loadCover = async () => {
            try {
                const base64 = await get(`song-cover-${songId}`);

                if (!base64 || !active) return;
                setCoverSrc(base64);
            } catch (err) {
                console.error("Error loading cover:", err);
            }
        }
        loadCover();

        return () => {
            active = false;
            if (objectURLRef.current) {
                URL.revokeObjectURL(objectURLRef.current);
                objectURLRef.current = null;
            }
        }
    }, [songId, fallbackCover])
    
    // Takes a new image, compresses it and saves it to base64
    const handleNewImage = async (file) => {
        if (!file) return;

        const validationError = validateImage(file);
        if (validationError) {
            setError(validationError);
            return;
        }
        setError(null);

        try {
            const compressedBlob = await compressImage(file);

            // Preview using objectURL
            const objectURL = URL.createObjectURL(compressedBlob);
            if (objectURLRef.current) {
                URL.revokeObjectURL(objectURLRef.current);
            }

            objectURLRef.current = objectURL;
            setCoverSrc(objectURL);

            // Save as base64
            const base64 = await fileToBase64(compressedBlob);
            await set(`song-cover-${songId}`, base64);
        } catch (err) {
            console.error("Error handling new image:", err);
            setError("Failed to process image");
        }
    }

    const removeCover = async () => {
        if (objectURLRef.current) {
            URL.revokeObjectURL(objectURLRef.current);
            objectURLRef.current = null;
        }

        setCoverSrc(fallbackCover);
        await del(`song-cover-${songId}`);
    }

    return { coverSrc, error, handleNewImage, removeCover }
}