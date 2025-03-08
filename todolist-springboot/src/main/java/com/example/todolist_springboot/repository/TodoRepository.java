package com.example.todolist_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.todolist_springboot.model.entity.Todo;
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    
}