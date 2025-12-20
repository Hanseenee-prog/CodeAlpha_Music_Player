const RecentlyPlayed = () => {
    const recentlyPlayed = [
        { id: 1, title: "Song A", artist: "Artist A" },
        { id: 2, title: "Song B", artist: "Artist B" },
        { id: 3, title: "Song C", artist: "Artist C" },
        { id: 4, title: "Song D", artist: "Artist D" },
        { id: 5, title: "Song E", artist: "Artist E" },
    ]

    return ( 
        <aside>
            <div>Recently Played</div>

            <ul>
                <li>
                    {recentlyPlayed}
                </li>
            </ul>
        </aside>
    );
}
 
export default RecentlyPlayed;