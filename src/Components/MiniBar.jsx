import { PlayCircle, PauseCircle, SkipBack, SkipForward } from 'lucide-react';

const MiniBar = () => {
    return (
        <div className="justify-between sticky bottom-0 w-full h-30 bg-gray-300 rounded-t-lg flex items-center">
            <div className="flex flex-row items-center gap-2">
                <img src='../public/image.webp' className='w-10 mx-2' />

                <span className='flex flex-col text-[14px]'>
                    <span>Song Title</span>
                    <span>Artist Name</span>
                    <span className="">Now Playing</span>
                </span>
            </div>

            <div className='flex flex-col items-center w-3/5'>
                <input type="range" min="0" max="100" className="mx-4 w-4/5" />
                
                <div className='w-3/5 flex justify-between'>
                    <button><SkipBack /></button>
                    <button><PlayCircle /></button>
                    <button><SkipForward /></button>
                </div>
            </div>

            <div>00:00 / 03:30</div>
        </div>
    )
}

export default MiniBar;