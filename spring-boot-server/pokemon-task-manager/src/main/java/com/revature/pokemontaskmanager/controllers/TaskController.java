package com.revature.pokemontaskmanager.controllers;

import com.revature.pokemontaskmanager.entities.Post;
import com.revature.pokemontaskmanager.entities.Task;
import com.revature.pokemontaskmanager.entities.User;
import com.revature.pokemontaskmanager.repositories.TaskRepository;
import com.revature.pokemontaskmanager.repositories.UserRepository;
import com.revature.pokemontaskmanager.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/tasks")
public class TaskController {

    private TaskService service;

//    //create task
//    @PostMapping("/add")
//    public Task addTask(@RequestBody Task task){
//        System.out.println(task);
//        taskRepository.save(task);
//        return task;
//    }

    @PutMapping("/add/{id}")
    public void updateTask(@PathVariable("id") Long userId, @RequestBody Task task) {
        service.updateTask(userId, task);
    }

    @GetMapping("/get/{id}")
    public List<Task> getTasks(@PathVariable("id") Long userId) {
        return service.getTasks(userId);
    }

    //delete task
    @DeleteMapping("/remove/{id}")
    public void deleteTask(@PathVariable("id") int taskId){
        service.deleteTask(taskId);
    }

    // Complete task:
    @PutMapping("/complete/{id}")
    public void completeTask(@PathVariable("id") int taskId) {
        service.completeTask(taskId);
    }
}
