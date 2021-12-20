package com.revature.pokemontaskmanager.controllers;

import com.revature.pokemontaskmanager.entities.Pokemon;
import com.revature.pokemontaskmanager.entities.PokemonName;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.PokemonNameRepository;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pokemon")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PokemonNameController {

    @Autowired
    private PokemonNameRepository pokemonNameRepository;

    @PutMapping("/addPokemonNameDb")
    public void addPokemonNameDb(@RequestBody String[] pkmnNames) {
        // get the posts from the request:
        if(pokemonNameRepository==null) {
            for(int i=1;i<=898;i++) {
                PokemonName pn = new PokemonName(i, pkmnNames[i-1]);
                pokemonNameRepository.save(pn);
            }
        }

    }
}
