import Library from '../Components/Library';
import RecentlyPlayed from '../Components/RecentlyPlayed';

const Home = () => {
    return (
        <div className="space-y-8 pb-10">
            {/* Greeting Card */}
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-500 to-indigo-600 p-8 text-white shadow-xl shadow-blue-200/50">
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Good Morning,</h1>
                    <p className="mt-2 text-blue-100 text-lg opacity-90 font-medium">Ready for your morning vibes?</p>
                </div>
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    Recently Played
                </h2>
                <RecentlyPlayed />
            </section>

            {/* Library Section (Header is now inside Library component) */}
            <section className="relative">
                <Library />
            </section>
        </div>
    );
}

export default Home;