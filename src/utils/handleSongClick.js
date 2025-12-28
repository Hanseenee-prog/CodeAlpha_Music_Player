const handleSongClick = (song, array, action, source) => {
    const index = array.findIndex(s => s.id === song.id);
    if (index !== -1) {
        action(index, array, source);
    }
}

export default handleSongClick;