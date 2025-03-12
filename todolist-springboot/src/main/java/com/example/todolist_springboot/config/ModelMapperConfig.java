package com.example.todolist_springboot.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration // 此為配置檔
public class ModelMapperConfig {
    
    @Bean
    //@Scope("singleton") // 單一實體(預設)
    //@Scope("prototype") // 多實體
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}c