package com.revature.pokemontaskmanager.controllers;

import com.revature.pokemontaskmanager.dto.PostResponse;
import com.revature.pokemontaskmanager.dto.PostUpdateRequest;
import com.revature.pokemontaskmanager.entities.Pokemon;
import com.revature.pokemontaskmanager.entities.Post;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pokemon")
public class PokemonController {

    @Autowired
    private UserRepository userRepository;

    // given a user id and a new post, add the post to user
    @PutMapping("/update/{id}")
    public void updateUserPokemon(@PathVariable("id") Long id, @RequestBody Pokemon pokemon) {
        // get the posts from the request:
        User user = userRepository.findById(id).get();
        List<Pokemon> pokemon_db = user.getPokemon();
        pokemon_db.add(new Pokemon(pokemon.getPokemonId()));
        user.setPokemon(pokemon_db);
        userRepository.save(user);
    }

}
