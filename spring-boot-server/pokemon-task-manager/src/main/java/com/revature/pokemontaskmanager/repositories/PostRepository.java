package com.revature.pokemontaskmanager.repositories;

import com.revature.pokemontaskmanager.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
