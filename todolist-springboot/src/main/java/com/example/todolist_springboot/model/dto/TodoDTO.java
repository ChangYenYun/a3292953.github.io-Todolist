package com.example.todolist_springboot.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TodoDTO {
    private Long id;
    private String text;
    private Boolean completed;
}