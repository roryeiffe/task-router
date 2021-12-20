package com.revature.pokemontaskmanager.controllers;

import com.revature.pokemontaskmanager.dto.PostResponse;
import com.revature.pokemontaskmanager.entities.Comment;
import com.revature.pokemontaskmanager.entities.Post;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.PostRepository;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import com.revature.pokemontaskmanager.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService service;

    // given a user id and a new post, add the post to user
    @PutMapping("/update/{id}")
    public void updateUserPosts(@PathVariable("id") Long id, @RequestBody Post post) {
        service.updateUserPosts(id, post);
    }

    // get all posts:
    @GetMapping("/getPosts")
    public List<PostResponse> getPosts() {
        return service.getPosts();
    }

    // get all posts for specific user:
    @GetMapping("/getPosts/{id}")
    public List<PostResponse> getPostsForUser(@PathVariable("id")Long id) {
        return service.getPostsForUser(id);
    }

    // add a comment to a specific post
    @PutMapping("/comment/{id}")
    public void postComment(@PathVariable("id") Long postId, @RequestBody Comment comment){
        service.postComment(postId, comment);
    }

    // get a comment by id:
    @GetMapping("/comment/{id}")
    public List<Comment> getComments(@PathVariable("id") Long postId){
        return service.getComments(postId);
    }
}
