package com.revature.pokemontaskmanager.services;

import com.revature.pokemontaskmanager.dto.PostResponse;
import com.revature.pokemontaskmanager.entities.Comment;
import com.revature.pokemontaskmanager.entities.Post;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.PostRepository;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class PostServiceImpl implements PostService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Override
    public void updateUserPosts(Long id, Post post) {
        // get the posts from the request:
        User user = userRepository.findById(id).get();
        List<Post> posts = user.getPosts();
        posts.add(post);
        user.setPosts(posts);
        userRepository.save(user);
    }

    @Override
    public List<PostResponse> getPosts() {
        return userRepository.getPostJoin();
    }

    @Override
    public List<PostResponse> getPostsForUser(Long id) {
        return userRepository.getPostJoinById(id);
    }

    @Override
    public void postComment(Long postId, Comment comment) {
        Post post = postRepository.getById(postId);
        List<Comment> temp = post.getComments();
        System.out.println(comment);
        temp.add(comment);
        post.setComments(temp);
        System.out.println(temp);
        postRepository.save(post);
    }

    @Override
    public List<Comment> getComments(Long postId) {
        List<Comment> comments =  postRepository.getById(postId).getComments();
        Collections.sort(comments);
        Collections.reverse(comments);
        return comments;
    }
}
