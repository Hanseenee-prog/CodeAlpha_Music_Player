import Library from '../Components/Library';
import RecentlyPlayed from '../Components/RecentlyPlayed';
import '../index.css'

const Home = () => {
    return (
        <div>
            <div className="card bg-blue-300 h-25 flex flex-col justify-center">
                <h1 className="text-3xl font-bold">Good Morning,</h1>
                <p className="text-xl">Start your day with some great music!</p>
            </div>

            <div className='flex flex-col'>
                <h2 className='font-semibold text-xl'>Recently Played</h2>
                <RecentlyPlayed />
            </div>

            <Library />
        </div>
    );
}

export default Home;