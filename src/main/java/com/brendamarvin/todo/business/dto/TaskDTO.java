package com.brendamarvin.todo.business.dto;

import java.sql.Date;

import com.brendamarvin.todo.data.entity.Task;

public class TaskDTO implements Comparable<TaskDTO> {
    private int id;
    private Date dueDate;
    private String title;
    private String description;
    private boolean complete;
    private Integer index;

    public TaskDTO(Task task) {
        this.id = task.getId();
        this.dueDate = task.getDueDate();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.complete = task.getComplete();
        this.index = task.getIndex();
    }

    public Date getDueDate() {
        return this.dueDate;
    }
    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }
    public String getTitle() {
        return this.title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return this.description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public boolean getComplete() {
        return this.complete;
    }
    public void setComplete(boolean complete) {
        this.complete = complete;
    }
    public int getId() {
        return this.id;
    }
    public void setTitle(int id) {
        this.id = id;
    }

    public Integer getIndex() {
        return this.index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    @Override
    public int compareTo(TaskDTO o) {
        if (this.index < o.index) {
            return -1;
        } else if (this.index > o.index) {
            return 1;
        } else {
            return 0;
        }
    }
}