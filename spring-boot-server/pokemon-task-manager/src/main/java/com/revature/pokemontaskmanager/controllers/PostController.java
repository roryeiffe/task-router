package com.revature.pokemontaskmanager.controllers;

import com.revature.pokemontaskmanager.dto.PostResponse;
import com.revature.pokemontaskmanager.entities.Comment;
import com.revature.pokemontaskmanager.entities.Post;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.PostRepository;
import com.revature.pokemontaskmanager.repositories.UserRepository;
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
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

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

    // get all posts:
    @GetMapping("/getPosts")
    public List<PostResponse> getPosts() {
        return userRepository.getPostJoin();
    }

    // add a comment to a specific post
    @PutMapping("/comment/{id}")
    public void postComment(@PathVariable("id") Long postId, @RequestBody Comment comment){
        Post post = postRepository.getById(postId);
        List<Comment> temp = post.getComments();
        System.out.println(comment);
        temp.add(comment);
        post.setComments(temp);
        System.out.println(temp);
        postRepository.save(post);
    }

    // get a comment by id:
    @GetMapping("/comment/{id}")
    public List<Comment> getComments(@PathVariable("id") Long postId){
        List<Comment> comments =  postRepository.getById(postId).getComments();
        Collections.sort(comments);
        Collections.reverse(comments);
        return comments;
    }
}
