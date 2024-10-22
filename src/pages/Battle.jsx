import React, { useState, useEffect } from 'react';
import Nav from '../components/navigation';
import vsicon from '../assets/vsicon.png'
import ball from '../assets/Pokeball.png'

const Choice = ({ position, onPokemonChange }) => {
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch first 151 Pokemon
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(res => res.json())
            .then(data => {
                setPokemonList(data.results);
                // Set default Pokemon based on position
                const defaultPokemon = position === 'left' ? 'bulbasaur' : 'blastoise';
                fetchPokemonDetails(defaultPokemon);
            });
    }, []);

    const fetchPokemonDetails = async (pokemonName) => {
        setLoading(true);
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const data = await res.json();
            const pokemon = {
                name: data.name,
                type: data.types[0].type.name,
                hp: data.stats[0].base_stat,
                image: data.sprites.other['official-artwork'].front_default,
                moves: data.moves.slice(0, 4).map(move => move.move.name.replace('-', ' '))
            };
            setSelectedPokemon(pokemon);
            onPokemonChange(pokemon);
        } catch (error) {
            console.error('Error fetching pokemon:', error);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col relative">
            <img src={ball} className='absolute top-[3.25rem] left-4 z-10' />
            <h5 className='mb-2'>Choose your pokemon</h5>
            <div className='relative mb-4'>
                <select
                    className="text-black pl-12 pr-8 py-4 w-full rounded-2xl"
                    onChange={(e) => fetchPokemonDetails(e.target.value)}
                    value={selectedPokemon?.name || ''}
                >
                    {pokemonList.map((pokemon) => (
                        <option key={pokemon.name} value={pokemon.name}>
                            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {selectedPokemon && !loading && (
                <div className="flex w-full bg-white text-black rounded-2xl p-5 gap-8">
                    <div className="w-5/12 flex flex-col items-center justify-center">
                        <img
                            src={selectedPokemon.image}
                            alt={selectedPokemon.name}
                            className="w-32 h-32 object-contain"
                        />
                        <h5 className='text-xl font-medium capitalize'>{selectedPokemon.name}</h5>
                        <p className='text-sm text-gray-500 capitalize'>{selectedPokemon.type}</p>
                    </div>
                    <div className="w-1/2 flex flex-col divide-y divide-gray-400">
                        <h5 className='text-xl font-medium pb-4'>Pokemon Stats</h5>
                        <div className="flex w-full py-2">
                            <div className="w-1/2 text-gray-500">HP</div>
                            <div className="w-1/2">{selectedPokemon.hp}</div>
                        </div>
                        <div className="flex w-full py-2">
                            <div className="w-1/2 text-gray-500">Moves</div>
                            <div className="w-1/2 text-gray-600 flex flex-col">
                                {selectedPokemon.moves.map((move, index) => (
                                    <p className="text-sm capitalize" key={index}>{move}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Battle = () => {
    const [leftPokemon, setLeftPokemon] = useState(null);
    const [rightPokemon, setRightPokemon] = useState(null);
    const [battleResult, setBattleResult] = useState(null);

    const startBattle = () => {
        if (!leftPokemon || !rightPokemon) return;

        // Simple battle logic based on HP
        const result = leftPokemon.hp > rightPokemon.hp ?
            `${leftPokemon.name} wins!` :
            leftPokemon.hp < rightPokemon.hp ?
                `${rightPokemon.name} wins!` :
                "It's a tie!";

        setBattleResult(result);
    };

    return (
        <div>
            <Nav page="Battle" />
            <div className='max-w-7xl w-full mx-auto mt-24 flex flex-col'>
                <h1 data-aos='fade-up' className="text-3xl font-light text-center mb-4">Let the Battle Begin</h1>

                <div data-aos='fade-up' className="grid grid-cols-1 md:grid-cols-3 mb-4 px-4 md:px-0">
                    <Choice
                        position="left"
                        onPokemonChange={setLeftPokemon}
                    />
                    <div className="flex items-center justify-center text-4xl font-bold">
                        <img src={vsicon} />
                    </div>
                    <Choice
                        position="right"
                        onPokemonChange={setRightPokemon}
                    />
                </div>

                <div data-aos='fade-up' className="flex flex-col items-center w-full mb-12">
                    <button
                        className="mx-auto w-max text-white/50 border py-4 px-8 text-4xl rounded-full hover:bg-white/10 transition-colors"
                        onClick={startBattle}
                    >
                        Start Battle
                    </button>

                    {battleResult && (
                        <p className="mt-4 text-2xl text-white/80 capitalize">{battleResult}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Battle;