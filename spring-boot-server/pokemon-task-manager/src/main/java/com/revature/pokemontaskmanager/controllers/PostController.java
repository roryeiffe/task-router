package com.revature.pokemontaskmanager.controllers;

import com.revature.pokemontaskmanager.dto.PostResponse;
import com.revature.pokemontaskmanager.dto.PostUpdateRequest;
import com.revature.pokemontaskmanager.entities.Post;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private UserRepository userRepository;

    // given a user id and a new post, add the post to user
    @PutMapping("/update/{id}")
    public void updateUserPosts(@PathVariable("id") Long id, @RequestBody Post post) {
        // get the posts from the request:
        User user = userRepository.findById(id).get();
        List<Post> posts = user.getPosts();
        posts.add(post);
        user.setPosts(posts);
        userRepository.save(user);
    }

    @GetMapping("/getPosts")
    public List<PostResponse> getPosts() {
        return userRepository.getPostJoin();
    }
}
