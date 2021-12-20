package com.revature.pokemontaskmanager.controllers;

import com.revature.pokemontaskmanager.entities.Friend;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.FriendRepository;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import com.revature.pokemontaskmanager.services.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/friends")
public class FriendController {

    @Autowired
    private FriendService service;

    // add a new friend request:
    @PostMapping("/add")
    public void addFriendRequest(@RequestParam String email1, @RequestParam String email2) {
        service.addFriendRequest(email1, email2);
    }

    // get incoming friend requests for a given user:
    @GetMapping("/getIncoming/{id}")
    public List<Friend> getIncomingFriendRequests(@PathVariable("id") Long id) {
        return service.getIncomingFriendRequests(id);
    }

    @PutMapping("/approveRequest/{id}")
    public Friend approveRequest(@PathVariable("id") int id) {
        return service.approveRequest(id);
    }


    @PutMapping("/denyRequest/{id}")
    public Friend denyRequest(@PathVariable("id") int id) {
        return service.denyRequest(id);
    }

    @GetMapping("/getAllFriends/{id}")
    public List<Integer> getAllFriends(@PathVariable("id") Long userId) {
        return service.getAllFriends(userId);
    }
}

