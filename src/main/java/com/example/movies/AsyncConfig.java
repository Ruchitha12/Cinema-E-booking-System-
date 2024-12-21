package com.example.movies;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean
    public ThreadPoolTaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(4); // Set the core pool size as per your requirements
        executor.setMaxPoolSize(8); // Set the maximum pool size as per your requirements
        executor.setQueueCapacity(100); // Set the queue capacity as per your requirements
        executor.setThreadNamePrefix("AsyncThread-");
        executor.initialize();
        return executor;
    }
}