package com.brendamarvin.todo.data.repository;

import org.springframework.stereotype.Repository;

import com.brendamarvin.todo.data.entity.Task;

import org.springframework.data.repository.CrudRepository;

@Repository
public interface TaskRepository extends CrudRepository<Task, Integer> {
    
}