package com.revature.pokemontaskmanager.dto;

import com.revature.pokemontaskmanager.entities.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class PostUpdateRequest {
    int id;
    List<Post> posts;
}
