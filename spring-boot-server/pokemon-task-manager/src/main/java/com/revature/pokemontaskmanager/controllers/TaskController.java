package com.revature.pokemontaskmanager.controllers;

import com.revature.pokemontaskmanager.entities.Post;
import com.revature.pokemontaskmanager.entities.Task;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.TaskRepository;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

//    //create task
//    @PostMapping("/add")
//    public Task addTask(@RequestBody Task task){
//        System.out.println(task);
//        taskRepository.save(task);
//        return task;
//    }

    @PutMapping("/add/{id}")
    public void updateTask(@PathVariable("id") Long userId, @RequestBody Task task) {
        // get the posts from the request:
        User user = userRepository.findById(userId).get();
        List<Task> tasks = user.getTasks();
        tasks.add(task);
        user.setTasks(tasks);
        userRepository.save(user);
    }

    @GetMapping("/get/{id}")
    public List<Task> getTasks(@PathVariable("id") Long userId) {
        User user = userRepository.getById(userId);
        List<Task> tasks = user.getTasks();
        return tasks;
    }

    //delete task
    @DeleteMapping("/remove/{id}")
    public void deleteTask(@PathVariable("id") int taskId){
        taskRepository.deleteById(taskId);
    }

    // Complete task:
    @PutMapping("/complete/{id}")
    public void completeTask(@PathVariable("id") int taskId) {
        Task task = taskRepository.getById(taskId);
        task.setCompleted(true);
        taskRepository.save(task);
    }
}
