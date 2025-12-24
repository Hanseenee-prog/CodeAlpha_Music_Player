const handleSongClick = (song, array, action) => {
    const index = array.findIndex(s => s.id === song.id);
    if (index !== -1) {
        action(index, array);
    }
    console.log('found song', array[index]);
    console.log('from', array)
}

export default handleSongClick;