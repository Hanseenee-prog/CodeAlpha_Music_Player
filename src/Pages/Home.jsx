import Library from '../Components/Library';
import '../index.css'

const Home = () => {
    return (
        <div>
            <div className="card bg-blue-300 h-30 flex flex-col justify-center">
                <h1 className="text-3xl font-bold">Good Morning,</h1>
                <p className="text-xl">Start your day with some great music!</p>
            </div>

            <div className='grid grid-cols-4 gap-2'>
                <div className='card bg-green-300 h-30 flex flex-col justify-center'>
                    <h1 className="text-3xl font-bold">10 Songs</h1>
                    <p className="text-xl">Total</p>
                </div>

                <div className='card bg-yellow-300 h-30 flex flex-col justify-center'>
                    <h1 className="text-3xl font-bold">5 Playlists</h1>
                    <p className="text-xl">Created</p>
                </div>

                <div className='card bg-red-300 h-30 flex flex-col justify-center'>
                    <h1 className="text-3xl font-bold">2.5 hours</h1>
                    <p className="text-xl">Listening Time</p>
                </div>

                <div className='card bg-purple-300 h-30 flex flex-col justify-center'>
                    <h1 className="text-3xl font-bold">3 Favorites</h1>
                    <p className="text-xl">Songs Liked</p>
                </div>
            </div>

            <Library />
        </div>
    );
}

export default Home;