package com.revature.pokemontaskmanager.controllers;

import com.revature.pokemontaskmanager.dto.LoginRequest;
import com.revature.pokemontaskmanager.entities.Pokemon;
import com.revature.pokemontaskmanager.entities.Post;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import com.revature.pokemontaskmanager.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService service;


    @PostMapping("/register")
    public User addUser(@RequestBody User user) {
        return service.register(user);
    }

    // login, check password
    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return service.login(request);
    }

    // update the user's general information:
    @PutMapping("/update/{id}")
    public User updateUser(@RequestBody User user, @PathVariable("id") Long id) {
        return service.update(user, id);
    }

    // get all users:
    @GetMapping("/getAll")
    public List<User> getUsers() {
        return service.getUsers();
    }

    // get a specific user by email:
    @GetMapping("/getByEmail/{email}")
    public User getUserByEmail(@PathVariable("email") String email) {
        return service.getUserByEmail(email);
    }

    // get a user by id:
    @GetMapping("/getById/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return service.getUserById(id);
    }

//
//    @PutMapping("pokedex")
//    public void caughtPokemon(@RequestBody int dexNo) {
//
//    }

}
