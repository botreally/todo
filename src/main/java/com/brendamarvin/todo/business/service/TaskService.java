package com.brendamarvin.todo.business.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import com.brendamarvin.todo.business.dto.TaskDTO;
import com.brendamarvin.todo.data.entity.Task;
import com.brendamarvin.todo.data.repository.TaskRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    Logger logger = LoggerFactory.getLogger(TaskService.class);

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<TaskDTO> getTasks() {
        Iterable<Task> tasks = this.taskRepository.findAll();
        List<TaskDTO> taskList = new ArrayList<>();
        tasks.forEach(task -> {
            TaskDTO taskDTO = new TaskDTO(task);
            taskList.add(taskDTO);
        });
        Collections.sort(taskList);
        return taskList;
    }

    public List<TaskDTO> getTasks(boolean complete) {
        Iterable<Task> tasks = this.taskRepository.findAllByComplete(complete);
        List<TaskDTO> taskList = new ArrayList<>();
        tasks.forEach(task -> {
            TaskDTO taskDTO = new TaskDTO(task);
            taskList.add(taskDTO);
        });
        Collections.sort(taskList);
        return taskList;
    }

    public TaskDTO createOrUpdateTask(Task task) {
        if (task.getIndex() == null) {
            int newIndex = this.taskRepository.findAllByComplete(task.isComplete()).size();
            task.setIndex(newIndex);
        }
        this.taskRepository.save(task);
        TaskDTO taskDTO = new TaskDTO(task);
        return taskDTO;
    }

    public TaskDTO deleteTask(int id) {
        Task task = this.taskRepository.findById(id).get();
        this.taskRepository.deleteById(id);
        TaskDTO taskDTO = new TaskDTO(task);
        return taskDTO;
    }

    

}