package com.revature.pokemontaskmanager.services;

import com.revature.pokemontaskmanager.dto.LoginRequest;
import com.revature.pokemontaskmanager.entities.Pokemon;
import com.revature.pokemontaskmanager.entities.Post;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User register(User user) {
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

    @Override
    public User login(LoginRequest request) {
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

    @Override
    public User update(User user, Long id) {
        // get the update user from the request:
        User updatedUser = user;
        User user_db = userRepository.findById(id).get();
        user_db.setName(updatedUser.getName());
        user_db.setPhone(updatedUser.getPhone());
        user_db.setPassword(updatedUser.getPassword());
        user_db.setPoints(updatedUser.getPoints());
        user_db.setLevel(updatedUser.getLevel());
        user_db.setStarterId(updatedUser.getStarterId());
        // save to repository:
        return userRepository.save((user_db));
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).get();
    }
}
