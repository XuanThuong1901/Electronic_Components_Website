package com.example.be_electronic_components_website.controller;

import com.example.be_electronic_components_website.common.Message;
import com.example.be_electronic_components_website.util.Validator.ValidateInput;
import com.example.be_electronic_components_website.model.request.LoginRequest;
import com.example.be_electronic_components_website.model.request.RegisterRequest;
import com.example.be_electronic_components_website.model.response.LoginResponse;
import com.example.be_electronic_components_website.model.response.RegisterResponse;
import com.example.be_electronic_components_website.services.account.IAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IAccountService accountService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        if(request.getEmail().isEmpty())
            return ResponseEntity.badRequest().body(Message.VALIDATION_EMAIL_ERROR001);

        if(request.getPassword().isEmpty())
            return ResponseEntity.badRequest().body(Message.VALIDATION_PASSWORD_ERROR001);

        if(ValidateInput.containsGmail(request.getEmail()))
            return ResponseEntity.badRequest().body(Message.VALIDATION_EMAIL_ERROR002);

        LoginResponse response = accountService.login(request);

        if(response.getToken() == null)
            return ResponseEntity.badRequest().body(response);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register/{typeAccount}")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request, @PathVariable("typeAccount") String typeAccount){
        if(request.getFullName().isEmpty())
            return ResponseEntity.badRequest().body(Message.VALIDATION_NAME_ERROR001);

        if(request.getEmail().isEmpty())
            return ResponseEntity.badRequest().body(Message.VALIDATION_EMAIL_ERROR001);

        if(request.getAddress().isEmpty())
            return ResponseEntity.badRequest().body(Message.VALIDATION_ADDRESS_ERROR001);

        if(request.getPhoneNumber().isEmpty())
                return ResponseEntity.badRequest().body(Message.VALIDATION_PHONENUMBER_ERROR001);

        if(request.getPassword().isEmpty())
                return ResponseEntity.badRequest().body(Message.VALIDATION_PASSWORD_ERROR001);

        if(!ValidateInput.isStringValid(request.getFullName()))
                return ResponseEntity.badRequest().body(Message.VALIDATION_NAME_ERROR002);

        if(!ValidateInput.containsGmail(request.getEmail()))
                return ResponseEntity.badRequest().body(Message.VALIDATION_EMAIL_ERROR001);

        if(!ValidateInput.isPhoneNumber(request.getPhoneNumber()))
                return ResponseEntity.badRequest().body(Message.VALIDATION_PHONENUMBER_ERROR002);

        if(!ValidateInput.isPasswordValid(request.getPassword()))
                return ResponseEntity.badRequest().body(Message.VALIDATION_PASSWORD_ERROR002);

        RegisterResponse response = accountService.register(request, typeAccount);

        if(response.getToken() == null)
            return ResponseEntity.badRequest().body(response);

        return ResponseEntity.ok(response);
    }
}
