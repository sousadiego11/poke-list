
function PokemonList({ pokemons, loading }) {
  
  return (
    <div>
      <h1>Pokemons</h1>
    {loading ? 
    <p>Loading....</p> 
    :
    pokemons.map(pokemon => <div style={{margin: "6px"}} key={pokemon}>* {pokemon}</div>)
    }
    </div>
  );
}

export default PokemonList;
