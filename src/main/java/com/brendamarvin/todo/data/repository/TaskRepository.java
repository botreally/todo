package com.brendamarvin.todo.data.repository;

import org.springframework.stereotype.Repository;

import java.util.List;

import com.brendamarvin.todo.data.entity.Task;

import org.springframework.data.repository.CrudRepository;

@Repository
public interface TaskRepository extends CrudRepository<Task, Integer> {
    void deleteById(int id);

    boolean existsById(int id);

    List<Task> findAllByComplete(boolean complete);
}