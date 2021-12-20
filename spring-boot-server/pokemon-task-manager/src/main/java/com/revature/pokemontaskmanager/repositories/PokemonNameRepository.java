package com.revature.pokemontaskmanager.repositories;

import com.revature.pokemontaskmanager.entities.PokemonName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PokemonNameRepository extends JpaRepository<PokemonName, Long> {
}