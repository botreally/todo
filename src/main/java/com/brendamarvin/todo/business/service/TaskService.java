package com.brendamarvin.todo.business.service;

import java.util.ArrayList;
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
        return taskList;
    }

    public TaskDTO createOrUpdateTask(Task task) {
        this.taskRepository.save(task);
        TaskDTO taskDTO = new TaskDTO(task);
        return taskDTO;
    }

    public TaskDTO deleteTask(int id) {
        Task task = this.taskRepository.findById(id).get();
        this.taskRepository.deleteById(id);
        logger.debug("DIS IS TASK: " + task);
        TaskDTO taskDTO = new TaskDTO(task);
        return taskDTO;
    }

    

}