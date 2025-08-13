package com.snapgracehub.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SpaRedirectConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Forward all non-API routes without an extension to index.html (SPA fallback)
        registry.addViewController("/{spring:(?!api|swagger-ui|v3|h2-console).*$}").setViewName("forward:/index.html");
        registry.addViewController("/**/{spring:(?!api|swagger-ui|v3|h2-console).*$}").setViewName("forward:/index.html");
    }
}


