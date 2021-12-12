package com.revature.pokemontaskmanager.controllers;

import com.revature.pokemontaskmanager.entities.Task;
import com.revature.pokemontaskmanager.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    //create task
    @PostMapping("/add")
    public Task addTask(@RequestBody Task task){
        System.out.println(task);
        taskRepository.save(task);
        return task;
    }

    //delete task
    @DeleteMapping("/remove")
    public void deleteTask(Task task){
        taskRepository.delete(task);
    }
}
