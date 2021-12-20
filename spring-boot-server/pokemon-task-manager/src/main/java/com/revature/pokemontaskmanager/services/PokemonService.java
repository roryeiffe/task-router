package com.revature.pokemontaskmanager.services;

import com.revature.pokemontaskmanager.entities.Pokemon;
import org.springframework.stereotype.Service;

@Service
public interface PokemonService {
    public Pokemon updateUserPokemon(Long id, Pokemon pokemon);
}
