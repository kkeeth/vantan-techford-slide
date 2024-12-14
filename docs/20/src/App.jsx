import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";

// タイプ名の日本語マッピング
const typeTranslations = {
  normal: "ノーマル",
  fire: "ほのお",
  water: "みず",
  grass: "くさ",
  electric: "でんき",
  ice: "こおり",
  fighting: "かくとう",
  poison: "どく",
  ground: "じめん",
  flying: "ひこう",
  psychic: "エスパー",
  bug: "むし",
  rock: "いわ",
  ghost: "ゴースト",
  dragon: "ドラゴン",
  dark: "あく",
  steel: "はがね",
  fairy: "フェアリー",
};

const App = () => {
  const [input, setInput] = useState(""); // 入力値
  const [pokemon, setPokemon] = useState(null); // ポケモン情報
  const [error, setError] = useState(""); // エラーメッセージ
  const [loading, setLoading] = useState(false); // ローディング状態

  const fetchPokemon = async () => {
    if (!input) {
      setError("名前または番号を入力してください");
      setPokemon(null);
      return;
    }

    try {
      setError(""); // エラーをリセット
      setLoading(true); // ローディング開始

      let endpoint;

      if (!isNaN(input)) {
        // 入力が番号の場合
        endpoint = `https://pokeapi.co/api/v2/pokemon/${input}`;
      } else {
        // 入力が名前の場合（あいまい検索）
        const speciesResponse = await axios.get(
          "https://pokeapi.co/api/v2/pokemon-species?limit=10000",
        );
        const matchedSpecies = speciesResponse.data.results.find((species) =>
          species.name.toLowerCase().includes(input.toLowerCase()),
        );
        if (!matchedSpecies) {
          throw new Error("ポケモンが見つかりません");
        }
        endpoint = matchedSpecies.url.replace("pokemon-species", "pokemon");
      }

      // 詳細データを取得
      const response = await axios.get(endpoint);
      setPokemon(response.data); // ポケモン情報をセット
    } catch (e) {
      setError(e.message);
      setPokemon(null);
    } finally {
      setLoading(false); // ローディング終了
      setInput(""); // 入力の初期化
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        ポケモン情報検索
      </Typography>
      <Box display="flex" justifyContent="center" gap={2} mb={2}>
        <TextField
          label="ポケモンの名前または番号"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={fetchPokemon}>
          検索
        </Button>
      </Box>
      {loading && <CircularProgress />}
      {error && <Alert severity="error" mt={2}>{error}</Alert>}
      {pokemon && (
        <Card sx={{ marginTop: 3}}>
          <Box display="flex" justifyContent="center">
            <img src={pokemon.sprites.front_default} alt="ポケモンの画像" />
            <img src={pokemon.sprites.back_default} alt="ポケモンの画像" />
          </Box>
          <Box display="flex" justifyContent="center">
            <img src={pokemon.sprites.front_shiny} alt="ポケモンの画像" />
            <img src={pokemon.sprites.back_shiny} alt="ポケモンの画像" />
          </Box>
          <CardContent>
          <Typography className="poke-id" variant="h5" component="div">No.{pokemon.id}</Typography>
            <Typography className="poke-name" mt={1} color="text.secondary">名前：{pokemon.name.toUpperCase()}</Typography>
            <Typography className="poke-weight" color="text.secondary">重さ：{(pokemon.weight / 10).toFixed(1)} kg</Typography>
            <Typography className="poke-type" color="text.secondary">
              タイプ：
              {pokemon.types
                .map((type) => typeTranslations[type.type.name] || type.type.name)
                .join(", ")}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default App;
