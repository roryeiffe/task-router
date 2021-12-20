package com.revature.pokemontaskmanager.services;

import com.revature.pokemontaskmanager.dto.LoginRequest;
import com.revature.pokemontaskmanager.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    public User register(User user);
    public User login(LoginRequest request);
    public User update(User user, Long id);
    public List<User> getUsers();
    public User getUserByEmail(String email);
    public User getUserById(Long id);
}
