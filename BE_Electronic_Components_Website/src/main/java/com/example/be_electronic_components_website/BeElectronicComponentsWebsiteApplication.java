package com.example.be_electronic_components_website;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.be_electronic_components_website.repository")
@EntityScan(basePackages = "com.example.be_electronic_components_website.entity")
public class BeElectronicComponentsWebsiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(BeElectronicComponentsWebsiteApplication.class, args);
    }

}
