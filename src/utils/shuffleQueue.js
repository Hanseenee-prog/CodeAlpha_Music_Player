const shuffleQueue = (queue, currentSongIndex) => {
    const currentSong = queue[currentSongIndex];
    const otherSongs = queue.filter((_, i) => i !== currentSongIndex);
    
    return [currentSong, ...otherSongs.sort(() => Math.random() - 0.5)];
}

export default shuffleQueue;