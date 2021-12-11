package com.revature.pokemontaskmanager.dto;

import com.revature.pokemontaskmanager.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
// to update a user, we pass in an id and a user object:
public class UserUpdateRequest {
    Long id;
    User user;
}
