package com.revature.pokemontaskmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
// this is the format of a post response that we send back
// when the client wants to get posts:
public class PostResponse {
    private String userName;
    private String email;
    private int starterId;
    private String title;
    private String description;
}
