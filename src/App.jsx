import './App.css';
import { useState } from 'react';

function App() {
  const [pokemon, setPokemon] = useState(null);

  const getPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      setPokemon(data);
    } catch (error) {
      console.error('Error fetching the Pokemon:', error);
    }
  };

  return (
    <div className="App">
      <h1>Random Pokemon Generator</h1>
      <button onClick={getPokemon}>Generate</button>
      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      )}
      <div>
        <p>Abilities</p>
        <ul>
              {pokemon.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
