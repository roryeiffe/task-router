package com.revature.pokemontaskmanager.services;

import com.revature.pokemontaskmanager.entities.Task;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.TaskRepository;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService{

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void updateTask(Long userId, Task task) {
        // get the posts from the request:
        User user = userRepository.findById(userId).get();
        List<Task> tasks = user.getTasks();
        tasks.add(task);
        user.setTasks(tasks);
        userRepository.save(user);
    }

    @Override
    public List<Task> getTasks(Long userId) {
        User user = userRepository.getById(userId);
        List<Task> tasks = user.getTasks();
        return tasks;
    }

    @Override
    public void deleteTask(int taskId) {
        taskRepository.deleteById(taskId);
    }

    @Override
    public void completeTask(int taskId) {
        Task task = taskRepository.getById(taskId);
        task.setCompleted(true);
        taskRepository.save(task);
    }
}
