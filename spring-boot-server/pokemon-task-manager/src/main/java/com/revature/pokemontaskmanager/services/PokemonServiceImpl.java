package com.revature.pokemontaskmanager.services;

import com.revature.pokemontaskmanager.entities.Pokemon;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PokemonServiceImpl implements PokemonService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public Pokemon updateUserPokemon(Long id, Pokemon pokemon) {
        // get the posts from the request:
        User user = userRepository.findById(id).get();
        List<Pokemon> pokemon_db = user.getPokemon();
        Pokemon newPokemon = new Pokemon(pokemon.getPokemonId());
        pokemon_db.add(newPokemon);
        user.setPokemon(pokemon_db);
        userRepository.save(user);
        return newPokemon;
    }
}
