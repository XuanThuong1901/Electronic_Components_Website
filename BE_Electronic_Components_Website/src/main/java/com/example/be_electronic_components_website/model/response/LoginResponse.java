package com.example.be_electronic_components_website.model.response;

import com.example.be_electronic_components_website.entity.user.Account;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private Account account;
    private String token;
    private String message;
}
