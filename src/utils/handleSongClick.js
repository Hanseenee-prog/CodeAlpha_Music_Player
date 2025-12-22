const handleSongClick = (song, array, action) => {
    const index = array.findIndex(s => s.id === song.id);
    if (index !== -1) {
        action(index, array);
    }
}

export default handleSongClick;