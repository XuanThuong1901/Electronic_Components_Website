package com.poly.ecommercestore.controller.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poly.ecommercestore.common.Message;
import com.poly.ecommercestore.configuration.JWTUnit;
import com.poly.ecommercestore.entity.Accounts;
import com.poly.ecommercestore.repository.AccountRepository;
import com.poly.ecommercestore.DTO.client.AccountDTO;
import com.poly.ecommercestore.DTO.client.UserDTO;
import com.poly.ecommercestore.response.AuthResponse;
import com.poly.ecommercestore.service.user.AuthService;
import com.poly.ecommercestore.util.ValidateInput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private JWTUnit jwtUtil;

    @PostMapping("/register/customer")
    public ResponseEntity<String> register(@RequestBody UserDTO request){
        if(request.getName().isEmpty())
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_NAME_ERROR001);
        }

        if(request.getEmail().isEmpty())
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_EMAIL_ERROR001);
        }

        if(request.getAddress().isEmpty())
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_ADDRESS_ERROR001);
        }

        if(request.getTelephone().isEmpty())
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_PHONENUMBER_ERROR001);
        }
        if(request.getPassword().isEmpty())
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_PASSWORD_ERROR001);
        }
        if(!ValidateInput.isStringValid(request.getName()))
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_NAME_ERROR002);
        }
        if(!ValidateInput.containsGmail(request.getEmail()))
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_EMAIL_ERROR002);
        }
        if(!ValidateInput.isPhoneNumber(request.getTelephone()))
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_PHONENUMBER_ERROR002);

        }
        if(!ValidateInput.isPasswordValid(request.getPassword()))
            return ResponseEntity.badRequest().body(Message.VALIDATION_PASSWORD_ERROR002);

        if(accountRepository.getByEmail(request.getEmail()) != null){
            return ResponseEntity.badRequest().body(Message.VALIDATION_EMAIL_ERROR003);
        }

        boolean isCheck = authService.createCustomer(request);

        if(!isCheck)
            return ResponseEntity.badRequest().body(Message.REGISTER_ERROR001);

        return ResponseEntity.ok(Message.REGISTER_SUCCESS);
    }

    @PostMapping("/register/employee")
    public ResponseEntity<String> registerEmployee(@RequestParam("user") String userDTO, @RequestParam("avatar") MultipartFile avatar) throws JsonProcessingException {

        UserDTO user = new ObjectMapper().readValue(userDTO, UserDTO.class);
        if(user.getName().isEmpty())
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_NAME_ERROR001);
        }

        if(user.getEmail().isEmpty())
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_EMAIL_ERROR001);
        }

        if(user.getAddress().isEmpty())
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_ADDRESS_ERROR001);
        }

        if(user.getTelephone().isEmpty())
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_PHONENUMBER_ERROR001);
        }
        if(user.getPassword().isEmpty())
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_PASSWORD_ERROR001);
        }
        if(!ValidateInput.isStringValid(user.getName()))
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_NAME_ERROR002);
        }
        if(!ValidateInput.containsGmail(user.getEmail()))
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_EMAIL_ERROR002);
        }
        if(!ValidateInput.isPhoneNumber(user.getTelephone()))
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_PHONENUMBER_ERROR002);

        }
        if(!ValidateInput.isPasswordValid(user.getPassword()))
            return ResponseEntity.badRequest().body(Message.VALIDATION_PASSWORD_ERROR002);

        if(accountRepository.getByEmail(user.getEmail()) != null){
            return ResponseEntity.badRequest().body(Message.VALIDATION_EMAIL_ERROR003);
        }

        boolean isCheck = authService.createEmployee(user, avatar);

        if(!isCheck)
            return ResponseEntity.badRequest().body(Message.REGISTER_ERROR001);

        return ResponseEntity.ok(Message.REGISTER_SUCCESS);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AccountDTO accountDTO){
        if(accountDTO.getEmail().isEmpty())
            return ResponseEntity.badRequest().body(Message.VALIDATION_EMAIL_ERROR001);

        if(accountDTO.getPassword().isEmpty())
            return ResponseEntity.badRequest().body(Message.VALIDATION_PASSWORD_ERROR001);

        if(!ValidateInput.containsGmail(accountDTO.getEmail()))
            return ResponseEntity.badRequest().body(Message.VALIDATION_EMAIL_ERROR002);
        try {
            System.out.printf(accountDTO.getEmail() + "  pass: " + accountDTO.getPassword());
            Accounts account = authService.getAccountByLogin(accountDTO.getEmail(), accountDTO.getPassword());
            String email = accountDTO.getEmail();

            if(account != null && account.getStatus().getIDStatus() == 1){
                String token = jwtUtil.generateToken(email);
                var authResponse = AuthResponse.builder()
                        .token(token)
                        .account(account)
                        .message(Message.LOGIN_SUCCESS)
                        .build();

                return ResponseEntity.ok(authResponse);
            }
            return ResponseEntity.badRequest().body(Message.LOGIN_ERROR001);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @GetMapping("/resetPass/{email}")
    public ResponseEntity<?> resetPassword(@PathVariable(value = "email") String email){

            boolean isCheck = authService.resetPassword(email);

            if(isCheck == false)
                return ResponseEntity.badRequest().body(Message.RESET_PASSWORD_ERROR001);

            return  ResponseEntity.ok(Message.RESET_PASSWORD_SUCCESS);
//            return ResponseEntity.badRequest().body(e);
    }
}
