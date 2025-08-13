package com.snapgracehub.backend.config;

import java.util.List;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Value("${cors.allowed-origins:http://localhost:3000}")
    private List<String> allowedOrigins;

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        
        // For development, allow all localhost origins
        config.setAllowedOriginPatterns(Arrays.asList("http://localhost:*", "http://127.0.0.1:*"));
        config.setAllowedOrigins(allowedOrigins);
        
        // Allow common headers
        config.addAllowedHeader("*");
        
        // Allow all HTTP methods (GET, POST, PUT, DELETE, OPTIONS, etc.)
        config.addAllowedMethod("*");
        
        // Expose common headers that might be needed by the frontend
        config.addExposedHeader("Content-Type");
        config.addExposedHeader("Authorization");
        config.addExposedHeader("X-Requested-With");
        
        // Set preflight cache duration (in seconds)
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}


