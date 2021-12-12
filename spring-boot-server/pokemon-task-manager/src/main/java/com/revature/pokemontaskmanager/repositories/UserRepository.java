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
    @Query("SELECT new com.revature.pokemontaskmanager.dto.PostResponse(u.name, u.email, u.starterId, p.title, p.description) FROM User u JOIN u.posts p")
    public List<PostResponse> getPostJoin();

}
