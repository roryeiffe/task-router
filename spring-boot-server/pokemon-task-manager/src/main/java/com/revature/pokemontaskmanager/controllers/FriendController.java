package com.revature.pokemontaskmanager.controllers;

import com.revature.pokemontaskmanager.entities.Friend;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.FriendRepository;
import com.revature.pokemontaskmanager.repositories.UserRepository;
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
    private UserRepository userRepository;

    @Autowired
    FriendRepository friendRepository;

    // add a new friend request:
    @PostMapping("/add")
    public void addFriendRequest(@RequestParam String email1, @RequestParam String email2) {
        User user1 = userRepository.findByEmail(email1);
        User user2 = userRepository.findByEmail(email2);
        Friend friend = new Friend(user1, user2, "pending");
        // only save if user is non-null:
        if (user2 != null) {
            System.out.println(friend);
            friendRepository.save(friend);
        }
    }

    // get incoming friend requests for a given user:
    @GetMapping("/getIncoming/{id}")
    public List<Friend> getIncomingFriendRequests(@PathVariable("id") Long id) {
        User user = userRepository.findById(id).get();
        List<Friend> temp = friendRepository.findBySecondUser(user);
        List<Friend> friendRequests = new ArrayList<Friend>();
        for (Friend friend : temp) {
            if (friend.getStatus().equals("pending")) {
                friendRequests.add(friend);
            }
        }
        return friendRequests;
    }

    @PutMapping("/approveRequest/{id}")
    public Friend approveRequest(@PathVariable("id") int id) {
        Friend friend_db = friendRepository.findById(id).get();
        friend_db.setStatus("accepted");
        friendRepository.save(friend_db);
        return friend_db;
    }


    @PutMapping("/denyRequest/{id}")
    public Friend denyRequest(@PathVariable("id") int id) {
        Friend friend_db = friendRepository.findById(id).get();
        friend_db.setStatus("rejected");
        friendRepository.save(friend_db);
        return friend_db;
    }

    @GetMapping("/getAllFriends/{id}")
    public List<Integer> getAllFriends(@PathVariable("id") Long userId) {
        return friendRepository.findFriendIds(userId);
    }
}

