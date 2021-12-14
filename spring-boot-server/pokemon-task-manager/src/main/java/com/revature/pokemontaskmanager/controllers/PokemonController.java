package com.revature.pokemontaskmanager.controllers;

import com.revature.pokemontaskmanager.entities.Pokemon;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pokemon")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PokemonController {

    @Autowired
    private UserRepository userRepository;

    // given a user id and a new post, add the pokemon to user
    @PutMapping("/update/{id}")
    public Pokemon updateUserPokemon(@PathVariable("id") Long id, @RequestBody Pokemon pokemon) {
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
