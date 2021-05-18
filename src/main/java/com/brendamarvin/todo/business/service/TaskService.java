package com.brendamarvin.todo.business.service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.brendamarvin.todo.business.dto.TaskDTO;
import com.brendamarvin.todo.data.entity.Task;
import com.brendamarvin.todo.data.repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<TaskDTO> getTasks() {
        Iterable<Task> tasks = this.taskRepository.findAll();
        List<TaskDTO> taskList = new ArrayList<>();
        tasks.forEach(task -> {
            TaskDTO taskDTO = new TaskDTO();
            taskDTO.setDueDate(task.getDueDate());
            taskDTO.setTitle(task.getTitle());
            taskDTO.setDescription(task.getDescription());
            taskDTO.setComplete(task.getComplete());
            taskList.add(taskDTO);
        });
        return taskList;
    }

}