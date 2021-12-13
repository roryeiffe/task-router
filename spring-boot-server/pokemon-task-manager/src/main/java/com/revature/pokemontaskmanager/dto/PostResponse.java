package com.revature.pokemontaskmanager.dto;

import com.revature.pokemontaskmanager.entities.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
// this is the format of a post response that we send back
// when the client wants to get posts:
public class PostResponse {
    private String userName;
    private String email;
    private int starterId;
    private String title;
    private String description;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date date;
    private Set<Comment> comments;



}
