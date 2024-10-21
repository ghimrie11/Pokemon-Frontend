import Nav from "../components/navigation";
import ball from '../assets/Pokeball.png'
import bulbasour from '../assets/bulbasour.png'
import miraidon from '../assets/miraidon.png'
import RoaringMoon from '../assets/RoaringMoon.png'
import Chengpao from '../assets/Chengpao.png'
import IronJungulis from '../assets/IronJungulis.png'
import Anniphilape from '../assets/Anniphilape.png'
import Ceruledge from '../assets/Ceruledge.png'
import Quaquaval from '../assets/Quaquaval.png'
import Copperajah from '../assets/Copperajah.png'
import Collossal from '../assets/Collossal.png'
import Palika from '../assets/Palika.png'


export default function Pokedex() {
    return (
        <div>
            <Nav page="Pokedex" />
            <div className='max-w-7xl w-full mx-auto mt-12 md:mt-24 flex flex-col'>
                <h5 className="text-3xl mb-6 px-4 md:px-0">
                    Pokedex{" "}
                    <span className="text-sm font-light">
                        (450 pokemons)
                    </span>
                </h5>
                <div className="grid md:grid-cols-3 gap-x-4 mb-6 px-4 md:px-0">
                    <div className="flex flex-col gap-2">
                        <h5>Search Pokemon</h5>
                        <div className='relative mb-4'>
                            <img className='z-10 absolute top-1/2 -translate-y-1/2 ml-4' src={ball} />
                            <input placeholder="Your Pokemon" className="text-black pl-12 pr-8 py-4 w-full rounded-2xl" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5>Search Pokemon</h5>
                        <div className='relative mb-4'>
                            <img className='z-10 absolute top-1/2 -translate-y-1/2 ml-4' src={ball} />
                            <select defaultValue="bulbasaur" className="text-gray-500 pl-12 pr-8 py-4 w-full rounded-2xl">
                                <option value="bulbasaur">All</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5>Search Pokemon</h5>
                        <div className='relative mb-4'>
                            <img className='z-10 absolute top-1/2 -translate-y-1/2 ml-4' src={ball} />
                            <select defaultValue="bulbasaur" className="text-gray-500 pl-12 pr-8 py-4 w-full rounded-2xl">
                                <option value="bulbasaur">A-Z</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 md:px-0 mb-12">
                    <Card name="Miraidon" type="Electric" src={miraidon} />
                    <Card name="RoaringMoon" type="Dragon" src={RoaringMoon} />
                    <Card name="ChengPao" type="Ice" src={Chengpao} />
                    <Card name="Iron Jungulus" type="Dark" src={IronJungulis} />
                    <Card name="Anniphilape" type="Water" src={Anniphilape} />
                    <Card name="Ceruledge" type="Ghost" src={Ceruledge} />
                    <Card name="Quaquaval" type="Water" src={Quaquaval} />
                    <Card name="Copperajah" type="Steel" src={Copperajah} />
                    <Card name="Collossal" type="Rock,Fire" src={Collossal} />
                    <Card name="Palika" type="Water" src={Palika} />
                </div>
            </div>
        </div>
    )
}

export function Card({name, type, src}){
    return(
    <div className="rounded-2xl bg-white flex flex-col items-center justify-center py-6">
    <img src={src} />
    <h5 className="text-black text-2xl font-medium">{name}</h5>
    <p className="text-gray-500">{type}</p>
    </div>
    )
    }