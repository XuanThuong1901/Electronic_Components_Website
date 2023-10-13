package com.example.be_electronic_components_website.services.account;

import com.example.be_electronic_components_website.model.request.LoginRequest;
import com.example.be_electronic_components_website.model.request.RegisterRequest;
import com.example.be_electronic_components_website.model.response.LoginResponse;
import com.example.be_electronic_components_website.model.response.RegisterResponse;

public interface IAccountService {
    RegisterResponse register(RegisterRequest request, String typeAccount);
    LoginResponse login(LoginRequest request);
}
