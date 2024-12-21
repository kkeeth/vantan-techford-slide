import axios from 'axios';
import { useState } from 'react';
import './App.css';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';

const typeTranslations = {
  normal: 'ノーマル',
  fire: 'ほのお',
  water: 'みず',
  grass: 'くさ',
  electric: 'でんき',
  ice: 'こおり',
  fighting: 'かくとう',
  poison: 'どく',
  ground: '地面師',
  flying: 'ひこう',
  psychic: 'エスパー',
  bug: 'むし',
  rock: 'いわ',
  ghost: 'ゴースト',
  dragon: 'ドラゴン',
  dark: 'あく',
  steel: 'はがね',
  fairy: 'フェアリー',
};

function App() {
  const [input, setInput] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async () => {
    if (!input) {
      setError('名前または番号を入力してください');
      setPokemon(null);
      return;
    }

    try {
      setError('');
      setLoading(true);

      let endpoint;

      if (!Number.isNaN(Number(input))) {
        // 入力が番号の場合
        endpoint = `https://pokeapi.co/api/v2/pokemon/${input}`;
      } else {
        const speciesResponse = await axios.get(
          'https://pokeapi.co/api/v2/pokemon-species?limit=10000',
        );
        const matchedSpecies = speciesResponse.data.results.find((species) =>
          species.name.toLowerCase().includes(input.toLowerCase()),
        );

        if (!matchedSpecies) {
          throw new Error('ポケモンが見つかりません');
        }

        console.log(matchedSpecies);
        endpoint = matchedSpecies.url.replace('pokemon-species', 'pokemon');
      }
      const response = await axios.get(endpoint);
      setPokemon(response.data);
    } catch (e) {
      console.log(e);
      setError('ポケモンが見つかりませんでした');
      setPokemon(null);
    } finally {
      setLoading(false);
      setInput('');
    }
  };
  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        ポケモンサーチ
      </Typography>
      <Box display="flex" justifyContent="center" gap={2} mb={2}>
        <TextField
          label="ポケモンの名前を入力してください"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          fullWidth
        />
        <Button type="button" variant="contained" onClick={fetchPokemon}>
          検索
        </Button>
      </Box>
      {loading && <Alert severity="info">読み込み中...</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      {pokemon && (
        <Card className="card" sx={{ padding: 0 }}>
          <div className="poke-image">
            <Box>
              <img src={pokemon.sprites.front_default} alt="ポケモンの画像" />
              <img src={pokemon.sprites.back_default} alt="ポケモンの画像" />
            </Box>
            <Box>
              <img src={pokemon.sprites.front_shiny} alt="ポケモンの画像" />
              <img src={pokemon.sprites.back_shiny} alt="ポケモンの画像" />
            </Box>
          </div>
          <CardContent
            className="poke-text"
            sx={{ paddingX: 12, textAlign: 'start', bgcolor: grey[100] }}
          >
            <Typography className="poke-id" variant="h5" component="div">
              No.{pokemon.id}
            </Typography>
            <Typography className="poke-name" color="text.secondary" mt={1}>
              名前：{pokemon.name.toUpperCase()}
            </Typography>
            <Typography className="poke-weight" color="text.secondary">
              重さ：{(pokemon.weight / 10).toFixed(1)} kg
            </Typography>
            <Typography className="poke-type" color="text.secondary">
              タイプ：
              {pokemon.types
                .map(
                  (type) => typeTranslations[type.type.name] || type.type.name,
                )
                .join(', ')}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
export default App;
