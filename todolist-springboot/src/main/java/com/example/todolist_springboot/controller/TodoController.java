package com.example.todolist_springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todolist_springboot.exception.TodoNotFoundException;
import com.example.todolist_springboot.model.dto.TodoDTO;
import com.example.todolist_springboot.response.ApiResponse;
import com.example.todolist_springboot.service.TodoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/todolist")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4173"})
public class TodoController {

    @Autowired
    private TodoService todoService;

    // 獲取所有代辦事項
    @GetMapping("/")
    public ResponseEntity<ApiResponse<List<TodoDTO>>> getAllTodos(){
        List <TodoDTO> todos = todoService.getAllTodos();
        System.out.println(todos);
        String msg ="查詢成功";
        return ResponseEntity.ok(ApiResponse.sucess(msg, todos));
    }

     // 新增代辦事項
     @PostMapping("/")
     public ResponseEntity <ApiResponse<TodoDTO>> createTodo(@RequestBody TodoDTO todoDTO){
        TodoDTO createdTodoDTO = todoService.createTodo(todoDTO);
        String msg ="新增成功";
        return ResponseEntity.ok(ApiResponse.sucess(msg, createdTodoDTO));

     }

     // 更新代辦事項
     @PutMapping("/{id}")
     public ResponseEntity<ApiResponse<TodoDTO>> updateTodo(@PathVariable Long id, @RequestBody TodoDTO todoDTO) throws TodoNotFoundException{
        todoDTO.setId(id);
        TodoDTO updatedTodoDTO = todoService.updateTodo(todoDTO);
        String msg ="更新成功";
        return ResponseEntity.ok(ApiResponse.sucess(msg, updatedTodoDTO));
     }

     // 刪除代辦事項
     @DeleteMapping("/{id}")
     public ResponseEntity <ApiResponse<Void>> deleteTodo(@PathVariable Long id)throws TodoNotFoundException{
        todoService.deleteTodo(id);
        String msg="刪除成功";
        return ResponseEntity.ok(ApiResponse.sucess(msg, null));
     }

     // 統一處理異常狀況
     @ExceptionHandler(TodoNotFoundException.class)
        public ResponseEntity<ApiResponse<Void>> handleTodoRuntimException(TodoNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(HttpStatus.NOT_FOUND.value(), e.getMessage()));            
        }
     }

