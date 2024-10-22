import Nav from '../components/navigation'
import landingImg from '../assets/landing.png'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <Nav page="Home" />
            <div className='max-w-7xl w-full mx-auto mt-24 flex flex-col md:flex-row'>
                <div className="px-8 md:p-0 md:w-1/2 flex flex-col grow justify-center">
                    <p className='text-2xl'>Welcome to</p>
                    <h1 className='text-6xl'>Battle Pokemon</h1>
                    <p className='font-extralight mt-4'>Battle Pokemon is  a fun and enagaging way to battle between pokemons, whether for casual play or move serious competition between the pokemons.</p>
                    <Link to="/Battle" className='w-max border-2 py-2 px-4 rounded-full mt-4 duration-300 hover:bg-white hover:text-blue-500 hover:border-blue-500'>Start Battle</Link>
                </div>
                <div className="px-8 md:p-0 md:w-1/2 flex items-center justify-center">
                    <img src={landingImg} alt="Dragon" className='h-[28rem] w-auto' />
                </div>
            </div>
        </>
    )
}