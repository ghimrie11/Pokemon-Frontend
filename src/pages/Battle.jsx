import Choice from "../components/choice";
import vsicon from '../assets/vsicon.png'
import Nav from "../components/navigation";

export default function Battle() {
    return (
        <div>
            <Nav page="Battle" />
            <div className='max-w-7xl w-full mx-auto mt-24 flex flex-col'>
                <h1 className="text-3xl font-light text-center mb-4">Let the Battle Begin</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 mb-4 px-4 md:px-0">
                    <Choice name="Bulbasour" type="Grass" hp="345" />
                    <div className="flex items-center justify-center">
                        <img src={vsicon} />
                    </div>
                    <Choice name="Blastoise" type="Water" hp="267"/>
                    
                </div>
                <div className="flex justify-center w-full mb-12">
                    <button className="mx-auto w-max text-white/50 border py-4 px-8 text-4xl rounded-full">Start Battle</button>
                </div>
            </div>
        </div>
    )
}