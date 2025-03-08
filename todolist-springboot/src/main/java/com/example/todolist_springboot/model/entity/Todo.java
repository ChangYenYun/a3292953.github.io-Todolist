

package com.example.todolist_springboot.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity //  自動建立 todo 資料表
@Table(name = "todo") // 若資料表名與類名相同此行可以不用撰寫
public class Todo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 由資料庫本身來決定 id 的生成策略
    private Long id;

    @Column(name = "text", length = 255, nullable = false, unique = false)
    private String text;

    @Column(name = "completed", nullable = true)
    private Boolean completed;
    
}
