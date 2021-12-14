package com.revature.pokemontaskmanager.controllers;

import com.revature.pokemontaskmanager.dto.LoginRequest;
import com.revature.pokemontaskmanager.entities.Pokemon;
import com.revature.pokemontaskmanager.entities.Post;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // add the user to the database:
    @PostMapping("/register")
    public User addUser(@RequestBody User user) {
        // make sure neither pokemon nor posts are null:
        if (user.getPokemon() == null) {
            user.setPokemon(new ArrayList<Pokemon>());
        }
        if (user.getPosts() == null) {
            user.setPosts(new ArrayList<Post>());
        }
        userRepository.save(user);
        return user;
    }

    // login, check password
    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();
        User user_db = userRepository.findByEmail(email);
        if(user_db == null) return null;
        else{
            // if the password matches, return the db:
            if (user_db.getPassword().equals(password)){
                return user_db;
            }
        }
        return null;
    }

    // update the user's general information:
    @PutMapping("/update/{id}")
    public User updateUser(@RequestBody User user, @PathVariable("id") Long id) {
        // get the update user from the request:
        User updatedUser = user;
        User user_db = userRepository.findById(id).get();
        user_db.setName(updatedUser.getName());
        user_db.setPhone(updatedUser.getPhone());
        user_db.setPassword(updatedUser.getPassword());
        // save to repository:
        return userRepository.save((user_db));
    }

    // get all users:
    @GetMapping("/getAll")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // get a specific user by email:
    @GetMapping("/getByEmail/{email}")
    public User getUserByEmail(@PathVariable("email") String email) {
        return userRepository.findByEmail(email);
    }

    // get a user by id:
    @GetMapping("/getById/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return userRepository.findById(id).get();
    }

    @PutMapping("pokedex")
    public void caughtPokemon(@RequestBody int dexNo) {

    }

}
