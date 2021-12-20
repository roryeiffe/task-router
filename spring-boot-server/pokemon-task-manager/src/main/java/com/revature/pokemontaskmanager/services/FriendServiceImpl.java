package com.revature.pokemontaskmanager.services;

import com.revature.pokemontaskmanager.entities.Friend;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.FriendRepository;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FriendServiceImpl implements FriendService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    FriendRepository friendRepository;

    @Override
    public void addFriendRequest(String email1, String email2) {
        User user1 = userRepository.findByEmail(email1);
        User user2 = userRepository.findByEmail(email2);
        Friend friend = new Friend(user1, user2, "pending");
        // only save if user is non-null:
        if (user2 != null) {
            System.out.println(friend);
            friendRepository.save(friend);
        }
    }

    @Override
    public List<Friend> getIncomingFriendRequests(Long id) {
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

    @Override
    public Friend approveRequest(int id) {
        Friend friend_db = friendRepository.findById(id).get();
        friend_db.setStatus("accepted");
        friendRepository.save(friend_db);
        return friend_db;
    }

    @Override
    public Friend denyRequest(int id) {
        Friend friend_db = friendRepository.findById(id).get();
        friend_db.setStatus("rejected");
        friendRepository.save(friend_db);
        return friend_db;
    }

    @Override
    public List<Integer> getAllFriends(Long userId) {
        return friendRepository.findFriendIds(userId);
    }
}
