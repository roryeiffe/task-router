package com.revature.pokemontaskmanager.controllers;

import com.revature.pokemontaskmanager.entities.Pokemon;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import com.revature.pokemontaskmanager.services.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pokemon")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PokemonController {

    private PokemonService service;

    // given a user id and a new post, add the pokemon to user
    @PutMapping("/update/{id}")
    public Pokemon updateUserPokemon(@PathVariable("id") Long id, @RequestBody Pokemon pokemon) {
        return service.updateUserPokemon(id, pokemon);
    }

}
