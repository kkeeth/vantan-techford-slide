import type { FC } from "react";
import type { Pokemon } from "../types";
import { typeColors } from "../utils/typeColors";

type PokemonCardProps = {
	pokemon: Pokemon;
};

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
	return (
		<div className="pokemon-card">
			<div className="pokemon-image">
				<img
					src={
						pokemon.sprites.other["official-artwork"].front_default ||
						pokemon.sprites.front_default
					}
					alt={pokemon.name}
				/>
			</div>
			<div className="pokemon-info">
				<h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
				<p className="pokemon-id">#{pokemon.id.toString().padStart(3, "0")}</p>

				<div className="pokemon-types">
					{pokemon.types.map((typeInfo, index) => (
						<span
							key={`${index}-${pokemon.id}`}
							className="type-badge"
							style={{
								backgroundColor: typeColors[typeInfo.type.name] || "#777",
							}}
						>
							{typeInfo.type.name}
						</span>
					))}
				</div>

				<div className="pokemon-details">
					<div className="detail-item">
						<span className="detail-label">Height:{pokemon.height / 10}</span>
						<span>{(pokemon.height / 10).toFixed(1)} m</span>
					</div>
					<div className="detail-item">
						<span className="detail-label">Weight:</span>
						<span>{(pokemon.weight / 10).toFixed(1)} kg</span>
					</div>
					<div className="detail-item">
						<span className="detail-label">Abilities:</span>
						<span>
							{pokemon.abilities
								.map((ability) => ability.ability.name.replace("-", " "))
								.join(", ")}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PokemonCard;
