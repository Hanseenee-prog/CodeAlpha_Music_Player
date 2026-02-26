import * as mm from 'music-metadata';
import { set } from 'idb-keyval';

export const parseSongFile = async (file) => {
  try {
    // parseBlob takes the file object directly
    const metadata = await mm.parseBlob(file);
    
    // Extract the common tags
    const { title, artist, album, picture } = metadata.common;
    
    let id = crypto.randomUUID();

    // let fallbackCover = "/images/image.webp";

    // Handle Album Art (it comes as a buffer, needs to be a data URI
    if (picture && picture.length > 0) {
      const buffer = new Uint8Array(picture[0].data);
      const binary = buffer.reduce((data, byte) => data + String.fromCharCode(byte), '');

      const mimeType = picture[0].format.includes('/')
        ? picture[0].format
        : `image/${picture[0].format.toLowerCase()}`;

      const base64 = `data:${mimeType};base64,${btoa(binary)}`;
      console.log(base64)

      // Save Base64 to IDB under the key useSongCover expects
      await set(`song-cover-${id}`, base64);
      console.log(`${title} saved`);

      // Generate a temporary blob URL for immediate display
      // const blob = new Blob([buffer.buffer], { type: mimeType });
      // coverImage = URL.createObjectURL(blob);
    }

    return {
      id,
      file,
      title: title || file.name.replace(/\.[^/.]+$/, ""),
      artist: artist || "Unknown Artist",
      album: album || "Unknown Album",
      // coverImage: fallbackCover, 
      audioSrc: URL.createObjectURL(file), // Object URL For immediate use
      duration: metadata.format.duration || 0,
    };
  } 
  catch (error) {
    console.error("Error parsing metadata:", error);
  };
};