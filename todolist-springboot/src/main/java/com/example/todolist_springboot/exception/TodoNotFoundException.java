package com.example.todolist_springboot.exception;

// 自訂 Todo 查無資料的受檢例外
public class TodoNotFoundException extends Exception {
    public TodoNotFoundException(String message) {
        super(message);
    }
}