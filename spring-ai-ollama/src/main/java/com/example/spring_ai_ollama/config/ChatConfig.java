package com.example.spring_ai_ollama.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatConfig {

    @Bean 
    public ChatClient chatClient(ChatClient.Builder builder){
        return builder.build();
    }

}
