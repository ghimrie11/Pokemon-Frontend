import ball from '../assets/Pokeball.png'
import Bulbasour from '../assets/bulbasour.png'
import Blastoise from '../assets/blastoise.png'

export default function Choice({ name, type, hp }) {
    let imgsrc
    if (name == "Blastoise") {
        imgsrc = Blastoise
    } else {
        imgsrc = Bulbasour
    }
    let moves;

    if (name === "Blastoise") {
        moves = ["Flash Cannon", "Hyper Beam", "Aqua Ring", "Hydro Cannon"];
    } else {
        moves = ["Razor Leaf", "Speed Bomb", "Solar Beam", "Rock Smash"];
    }
    return (
        <div className="flex flex-col">
            <h5 className='mb-2'>Choose your pokemon</h5>
            <div className='relative mb-4'>
                <img className='z-10 absolute top-1/2 -translate-y-1/2 ml-4' src={ball} />
                <select defaultValue={name} className="text-black pl-12 pr-8 py-4 w-full rounded-2xl">
                    <option value={name}>{name}</option>
                </select>
            </div>
            <div className="flex w-full bg-white text-black rounded-2xl p-5 gap-8">
                <div className="w-/12 flex flex-col items-center justify-center">
                    <img src={imgsrc} />
                    <h5 className='text-xl font-medium'>{name}</h5>
                    <p className='text-sm text-gray-500'>{type}</p>
                </div>
                <div className="w-1/2 flex flex-col divide-y divide-gray-400">
                    <h5 className='text-xl font-medium pb-4'>Pokemon Stats</h5>
                    <div className="flex w-full py-2">
                        <div className="w-1/2 text-gray-500">HP</div>
                        <div className="w-1/2">{hp}</div>
                    </div>
                    <div className="flex w-full py-2">
                        <div className="w-1/2 text-gray-500">Moves</div>
                        <div className="w-1/2 text-gray-600 flex flex-col">
                            {
                                moves.map((move, index) => (
                                    <p className="text-sm" key={index}>{move}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}