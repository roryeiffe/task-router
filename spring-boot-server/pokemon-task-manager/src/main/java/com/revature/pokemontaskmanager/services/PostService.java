package com.revature.pokemontaskmanager.services;

import com.revature.pokemontaskmanager.dto.PostResponse;
import com.revature.pokemontaskmanager.entities.Comment;
import com.revature.pokemontaskmanager.entities.Post;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PostService {
    public void updateUserPosts(Long id, Post post);
    public List<PostResponse> getPosts();
    public List<PostResponse> getPostsForUser(Long id);
    public void postComment(Long postId, Comment comment);
    public List<Comment> getComments(Long postId);
}
