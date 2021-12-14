package com.revature.pokemontaskmanager.repositories;

import com.revature.pokemontaskmanager.dto.PostResponse;
import com.revature.pokemontaskmanager.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    // join query, get posts and user information:
    @Query("SELECT new com.revature.pokemontaskmanager.dto.PostResponse(u.name, u.email, u.starterId, p.id, p.title, p.description, p.date) FROM User u JOIN u.posts p ORDER BY p.date DESC")
    public List<PostResponse> getPostJoin();

    // join query, get posts and user information:
    @Query("SELECT new com.revature.pokemontaskmanager.dto.PostResponse(u.name, u.email, u.starterId, p.id, p.title, p.description, p.date) FROM User u JOIN u.posts p WHERE u.id = ?1 ORDER BY p.date DESC")
    public List<PostResponse> getPostJoinById(Long user_id);

}
