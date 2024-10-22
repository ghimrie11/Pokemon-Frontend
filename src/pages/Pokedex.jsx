import React, { useEffect, useState } from 'react';
import Nav from '../components/navigation'
import ball from '../assets/Pokeball.png'

const ITEMS_PER_PAGE = 10;

export default function Pokedex() {
    const [pokemon, setPokemon] = useState({
        list: [],
        filteredList: [],
        currentPage: 0,
        isLoading: true,
        searchQuery: '',
        sortOrder: 'asc',
        typeFilter: 'all'
    });

    const fetchPokemonDetails = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return {
            id: data.id,
            name: data.name,
            type: data.types.map(t => t.type.name).join(", "),
            image: data.sprites.other['official-artwork'].front_default,
            types: data.types.map(t => t.type.name)
        };
    };

    const fetchAllPokemon = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
            const data = await response.json();
            const pokemonList = await Promise.all(
                data.results.map(p => fetchPokemonDetails(p.url))
            );

            setPokemon(prev => ({
                ...prev,
                list: pokemonList,
                filteredList: pokemonList,
                isLoading: false
            }));
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
            setPokemon(prev => ({ ...prev, isLoading: false }));
        }
    };

    useEffect(() => {
        fetchAllPokemon();
    }, []);

    useEffect(() => {
        const filterAndSortPokemon = () => {
            let filtered = [...pokemon.list];

            // Apply search filter
            if (pokemon.searchQuery) {
                filtered = filtered.filter(p =>
                    p.name.toLowerCase().includes(pokemon.searchQuery.toLowerCase())
                );
            }

            // Apply type filter
            if (pokemon.typeFilter !== 'all') {
                filtered = filtered.filter(p =>
                    p.types.includes(pokemon.typeFilter.toLowerCase())
                );
            }

            // Apply sorting
            filtered.sort((a, b) => {
                return pokemon.sortOrder === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            });

            setPokemon(prev => ({ ...prev, filteredList: filtered }));
        };

        filterAndSortPokemon();
    }, [pokemon.searchQuery, pokemon.typeFilter, pokemon.sortOrder, pokemon.list]);

    const currentPokemon = pokemon.filteredList.slice(
        pokemon.currentPage * ITEMS_PER_PAGE,
        (pokemon.currentPage + 1) * ITEMS_PER_PAGE
    );

    const handleNextPage = () => {
        if ((pokemon.currentPage + 1) * ITEMS_PER_PAGE < pokemon.filteredList.length) {
            setPokemon(prev => ({ ...prev, currentPage: prev.currentPage + 1 }));
        }
    };

    const handlePrevPage = () => {
        if (pokemon.currentPage > 0) {
            setPokemon(prev => ({ ...prev, currentPage: prev.currentPage - 1 }));
        }
    };

    return (
        <div>
            <Nav page="Pokedex" />
            <div className='max-w-7xl w-full mx-auto mt-12 md:mt-24 flex flex-col'>

                <h5 data-aos='fade-up' className="text-3xl mb-6 px-4 md:px-0">
                    Pokedex{" "}
                    <span className="text-sm font-light">
                        ({pokemon.list.length} pokémons)
                    </span>
                </h5>

                {/* Controls */}
                <div data-aos='fade-up' className="grid md:grid-cols-3 gap-x-4 mb-2 px-4 md:px-0">
                    {/* Search Input */}
                    <div className="flex flex-col gap-2">
                        <h5>Search Pokemon</h5>
                        <div className='relative mb-4'>
                            <img className='z-10 absolute top-1/2 -translate-y-1/2 ml-4' src={ball} alt="Pokeball" />
                            <input
                                type="text"
                                placeholder="Your Pokemon"
                                className="text-black pl-12 pr-8 py-4 w-full rounded-2xl"
                                value={pokemon.searchQuery}
                                onChange={(e) => setPokemon(prev => ({
                                    ...prev,
                                    searchQuery: e.target.value,
                                    currentPage: 0
                                }))}
                            />
                        </div>
                    </div>

                    {/* Type Filter */}
                    <div className="flex flex-col gap-2">
                        <h5>Filter by Type</h5>
                        <div className='relative mb-4'>
                            <img className='z-10 absolute top-1/2 -translate-y-1/2 ml-4' src={ball} alt="Pokeball" />
                            <select
                                className="text-gray-500 pl-12 pr-8 py-4 w-full rounded-2xl"
                                value={pokemon.typeFilter}
                                onChange={(e) => setPokemon(prev => ({
                                    ...prev,
                                    typeFilter: e.target.value,
                                    currentPage: 0
                                }))}
                            >
                                <option value="all">All Types</option>
                                <option value="fire">Fire</option>
                                <option value="water">Water</option>
                                <option value="grass">Grass</option>
                                <option value="electric">Electric</option>
                                <option value="psychic">Psychic</option>
                                <option value="ice">Ice</option>
                                <option value="dragon">Dragon</option>
                                <option value="dark">Dark</option>
                                <option value="fairy">Fairy</option>
                                <option value="normal">Normal</option>
                                <option value="fighting">Fighting</option>
                                <option value="flying">Flying</option>
                                <option value="poison">Poison</option>
                                <option value="ground">Ground</option>
                                <option value="rock">Rock</option>
                                <option value="bug">Bug</option>
                                <option value="ghost">Ghost</option>
                                <option value="steel">Steel</option>
                            </select>
                        </div>
                    </div>

                    {/* Sort Order */}
                    <div className="flex flex-col gap-2">
                        <h5>Sort Order</h5>
                        <div className='relative mb-4'>
                            <img className='z-10 absolute top-1/2 -translate-y-1/2 ml-4' src={ball} alt="Pokeball" />
                            <select
                                className="text-gray-500 pl-12 pr-8 py-4 w-full rounded-2xl"
                                value={pokemon.sortOrder}
                                onChange={(e) => setPokemon(prev => ({
                                    ...prev,
                                    sortOrder: e.target.value,
                                    currentPage: 0
                                }))}
                            >
                                <option value="asc">A-Z</option>
                                <option value="desc">Z-A</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div data-aos='fade-up' className="flex mb-6 gap-4 px-4 md:px-0">
                    <button
                        className={`px-4 py-2 border rounded-full duration-300 ${pokemon.currentPage === 0
                            ? 'opacity-80 cursor-not-allowed bg-gray-200 text-gray-500'
                            : 'hover:text-blue-500 hover:bg-white'
                            }`}
                        onClick={handlePrevPage}
                        disabled={pokemon.currentPage === 0}
                    >
                        Previous
                    </button>
                    <button
                        className={`px-4 py-2 border rounded-full duration-300 ${(pokemon.currentPage + 1) * ITEMS_PER_PAGE >= pokemon.filteredList.length
                            ? 'opacity-80 cursor-not-allowed bg-gray-200 text-gray-500'
                            : 'hover:text-blue-500 hover:bg-white'
                            }`}
                        onClick={handleNextPage}
                        disabled={(pokemon.currentPage + 1) * ITEMS_PER_PAGE >= pokemon.filteredList.length}
                    >
                        Next
                    </button>
                </div>

                {/* Pokemon Grid */}
                <div className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 md:px-0 mb-12 ${currentPokemon.length <= 0 && 'min-h-[700px]'
                    }`}>
                    {pokemon.isLoading ? (
                        <div>Loading...</div>
                    ) : currentPokemon.map((pokemon) => (
                        <Card
                            key={pokemon.id}
                            name={pokemon.name}
                            type={pokemon.type}
                            src={pokemon.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

const Card = ({ name, type, src }) => (
    <div className="rounded-2xl bg-white flex flex-col items-center justify-center py-6">
        <img src={src} alt={name} />
        <h5 className="text-black text-2xl font-medium capitalize">{name}</h5>
        <p className="text-gray-500 capitalize">{type}</p>
    </div>
);