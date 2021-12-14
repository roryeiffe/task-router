package com.revature.pokemontaskmanager.repositories;

import com.revature.pokemontaskmanager.entities.Friend;
import com.revature.pokemontaskmanager.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Integer> {
    public List<Friend> findBySecondUser(User user);

    @Query(value = "SELECT second_user_id FROM friend WHERE first_user_id = ?1 UNION SELECT first_user_id FROM FRIEND WHERE second_user_id = ?1",
    nativeQuery = true)
    List<Integer> findFriendIds(Long userId);
}
