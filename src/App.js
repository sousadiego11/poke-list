import axios from 'axios'
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import PokemonList from './PokemonList';

function App() {
  const [pokemons, setPokemons] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setNextPageUrl] = useState()
  const [previousPageUrl, setPreviousPageUrl] = useState()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then((res) => {
      setLoading(false)
      setPokemons(res.data.results.map(result => result.name))
      setNextPageUrl(res.data.next)
      setPreviousPageUrl(res.data.previous)
    })

    return () => cancel()
  }, [currentPageUrl])

  const goToPreviousPage = () => {
    setCurrentPageUrl(previousPageUrl)
  }

  const goToNextPage = () => {
    setCurrentPageUrl(nextPageUrl)
  }

  return (
    <div 
    style={{
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center'
    }}
    >
      <PokemonList 
      pokemons={pokemons} 
      loading={loading}
      />

      <Pagination
      goToPreviousPage={previousPageUrl ? goToPreviousPage : null}
      goToNextPage={nextPageUrl ? goToNextPage : null}
      />
    </div>
  );
}

export default App;
