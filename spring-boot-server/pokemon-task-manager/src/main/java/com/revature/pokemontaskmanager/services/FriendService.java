package com.revature.pokemontaskmanager.services;

import com.revature.pokemontaskmanager.entities.Friend;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FriendService {
    public void addFriendRequest(String email1, String email2);
    public List<Friend> getIncomingFriendRequests(Long id);
    public Friend approveRequest(int id);
    public Friend denyRequest(int id);
    public List<Integer> getAllFriends(Long userId);
}
