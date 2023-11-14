package com.poly.ecommercestore.configuration;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000"); // Điền đúng địa chỉ của frontend ReactJS
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/user/**").permitAll()
                        .requestMatchers("/category/**").permitAll()
                        .requestMatchers("/product/**").permitAll()
                        .requestMatchers("/supplier/**").permitAll()
                        .requestMatchers("/shipping_unit/**").permitAll()
                        .requestMatchers("/payment/**").permitAll()
                        .requestMatchers("/import/**").permitAll()
                        .requestMatchers("/cart/**").permitAll()
                        .requestMatchers("/order/**").permitAll()
                        .requestMatchers("/admin/**").permitAll()
                        .requestMatchers("/admin/order/**").permitAll()
                        .requestMatchers("/status/**").permitAll()
                        .requestMatchers("/tax/**").permitAll()
                        .requestMatchers("/evaluation/**").permitAll()
                        .requestMatchers("/admin/report/**").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin((form) -> form
//                        .loginPage("/login")
                        .permitAll()
                )
                .logout((logout) -> logout.permitAll());

        return http.build();
    }

//    @Bean
//    public UserDetailsService userDetailsService() {
//        UserDetails user =
//                User.withDefaultPasswordEncoder()
//                        .username("user")
//                        .password("password")
//                        .roles("USER")
//                        .build();
//
//        return new InMemoryUserDetailsManager(user);
//    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//
//        http.authorizeRequests()
////                .antMatchers(HttpMethod.GET, "/api/**")
////                .permitAll()
////                .antMatchers(HttpMethod.POST, "/api/**")
////                .permitAll()
//                .antMatchers("/api/**")
//                .permitAll()
//                .anyRequest().authenticated();
//
//    }

    //    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
}
