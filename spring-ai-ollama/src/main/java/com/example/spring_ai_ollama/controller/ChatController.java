package com.example.spring_ai_ollama.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatClient chatClient;

    // 透過 application.properties 所設定的模型 + 統一回報
    @GetMapping("/ask")
    public String ask(@RequestParam String q) {
        return chatClient.prompt().user(q).call().content();
    }

    // 選擇不同的模型 + 逐字回報
    @GetMapping(value = "ask2", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter ask2(@RequestParam String q, 
                           @RequestParam(required = false, defaultValue = "llama3.2:3b") String model) {
        // 建立發射器
        SseEmitter emitter = new SseEmitter();
        
        // 建立 ChatOptions 來動態指定模型
        ChatOptions options = ChatOptions.builder().model(model).build();

        // 使用 ChatClient 的 stream 方法來獲取串流回應
        Flux<String> responseFlex = chatClient.prompt()
                                              .user(q)
                                              .options(options)
                                              .stream()
                                              .content();
        
        // 透過訂閱機制將資料逐字傳送給前端
        responseFlex.subscribe(
            word -> {
                try {
                    emitter.send(word); // 逐字發送
                } catch (Exception e) {
                    emitter.completeWithError(e); // 回報錯誤
                }
            },
            emitter::completeWithError,
            emitter::complete
        );

        return emitter;
    }



}