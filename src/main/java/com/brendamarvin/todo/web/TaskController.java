package com.brendamarvin.todo.web;

import java.util.List;

import com.brendamarvin.todo.business.dto.TaskDTO;
import com.brendamarvin.todo.business.service.TaskService;
import com.brendamarvin.todo.data.entity.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/task")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public String getTasks(Model model) {
        List<TaskDTO> tasks = taskService.getTasks();
        model.addAttribute("tasks", tasks);
        System.out.println("Tasks length: " + tasks.size());
        return "task";
    }
}