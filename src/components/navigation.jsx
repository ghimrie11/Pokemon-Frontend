import logo from '../assets/logo.png';
import ball from '../assets/Pokeball.png'
import { Link } from 'react-router-dom';


export default function Nav({ page }) {

    return (
        <nav className="max-w-md md:max-w-7xl h-max mt-10 mx-auto w-full bg-white p-4 rounded-2xl flex items-center justify-between">
            <img className='max-w-[8rem] sm:max-w-max' src={logo} />
            <div className='md:flex gap-[24px] text-lg text-gray-300 font-light hidden'>
                <Navlink page={page} title="Home" />
                <Navlink page={page} title="Battle" />
                <Navlink page={page} title="Pokedex" />
                <Navlink page={page} title="About" />
            </div>
            <div className="flex md:hidden items-center justify-center relative">
                <p className='text-7xl absolute text-gray-500 -translate-y-[18px] -translate-x-[2rem]'>...</p>
            </div>
        </nav>
    )
}

export function Navlink({ page, title }) {
    return (
        <div className='flex items-center gap-2'>
            {page == title && <img src={ball} />}
            <Link to={`/${title}`} className={page == title && `text-blue-500`} >{title}</Link>
        </div>
    )
}