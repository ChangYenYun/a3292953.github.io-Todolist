package com.example.todolist_springboot.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.todolist_springboot.exception.TodoNotFoundException;
import com.example.todolist_springboot.model.dto.TodoDTO;
import com.example.todolist_springboot.model.entity.Todo;
import com.example.todolist_springboot.repository.TodoRepository;


@Service
public class TodoServiceImpl implements TodoService{

    @Autowired
    private TodoRepository todoRepository;
    
    @Autowired
    private ModelMapper modelMapper;

    // 取得所有代辦事項
    @Override
    public List<TodoDTO> getAllTodos() {
       List<Todo> todos = todoRepository.findAll();
       System.out.println(todos);
       return todos.stream().map(todo -> modelMapper.map(todo, TodoDTO.class)).toList();
       
    }

    // 新增代辦事項
    @Override
    public TodoDTO createTodo(TodoDTO todoDTO) {
       // 將 TodoDTO 轉 Todo
       Todo todo = modelMapper.map(todoDTO, Todo.class);
       Todo savedTodo = todoRepository.save(todo);
       // 將 savedTodo 轉 TodoDTO 傳回
       return modelMapper.map(savedTodo, TodoDTO.class);
       
      
    }

    // 更新代辦事項
    @Override
    public TodoDTO updateTodo(TodoDTO todoDTO) throws TodoNotFoundException {
       return todoRepository.findById(todoDTO.getId())  // 回找到資料表中的 todo
                            .map(todo -> {
                              modelMapper.map(todoDTO, todo); // 更新欄位資料
                              Todo updateTodo = todoRepository.save(todo); // 將更新好的 todo 回存至資料表
                              return modelMapper.map(updateTodo, TodoDTO.class);
                            })
                            .orElseThrow(() -> new TodoNotFoundException("查無資料"));
   }

    // 刪除代辦事項
    @Override
    public void deleteTodo(Long id) throws TodoNotFoundException {
            // 檢查待辦事項是否存在
            todoRepository.findById(id)
            .map(todo -> {
               todoRepository.deleteById(id);  // 如果存在就刪除
               return todo;
            })
            .orElseThrow(() -> new TodoNotFoundException("刪除失敗，查無資料"));      
    }

    
}