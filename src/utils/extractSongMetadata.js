import * as mm from 'music-metadata';

export const extractMetadata = async (file) => {
  try {
    // parseBlob takes the file object directly
    const metadata = await mm.parseBlob(file);
    
    // Extract the common tags
    const { title, artist, album, picture } = metadata.common;
    
    // Handle Album Art (it comes as a buffer, needs to be a Blob URL)
    let coverImage = null;
    if (picture && picture.length > 0) {
      const buffer = picture[0].data;
      const blob = new Blob([buffer], { type: picture[0].format });
      coverImage = URL.createObjectURL(blob);
    }

    return {
      title: title || file.name.replace(/\.[^/.]+$/, ""), // Fallback to filename
      artist: artist || "Unknown Artist",
      album: album || "Unknown Album",
      coverImage: coverImage || null, // You can use a default image if null
      duration: metadata.format.duration || 0
    };
  } catch (error) {
    console.error("Error parsing metadata:", error);
    // Return a safe fallback if parsing fails
    return {
      title: file.name,
      artist: "Unknown Artist",
      album: "Unknown Album",
      coverImage: null,
      duration: 0
    };
  }
};