package com.revature.pokemontaskmanager.services;

import com.revature.pokemontaskmanager.entities.Task;

import java.util.List;

public interface TaskService {

    public void updateTask(Long userId, Task task);
    public List<Task> getTasks(Long userId);
    public void deleteTask(int taskId);
    public void completeTask(int taskId);
}
