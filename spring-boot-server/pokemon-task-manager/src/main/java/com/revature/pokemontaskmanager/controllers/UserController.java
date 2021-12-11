package com.revature.pokemontaskmanager.controllers;

import com.revature.pokemontaskmanager.dto.UserUpdateRequest;
import com.revature.pokemontaskmanager.entities.Pokemon;
import com.revature.pokemontaskmanager.entities.Post;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
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

    // update the user's general information:
    @PutMapping("/update")
    public User updateUser(@RequestBody UserUpdateRequest request) {
        // get the update user from the request:
        User updatedUser = request.getUser();
        // get the id to change from the request:
        Long id = request.getId();
        User user_db = userRepository.findById(id).get();
        user_db.setName(updatedUser.getName());
        user_db.setEmail(updatedUser.getEmail());
        user_db.setPhone(updatedUser.getPhone());
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



}
