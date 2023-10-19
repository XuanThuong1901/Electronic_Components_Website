package com.poly.ecommercestore.controller.user;

import com.poly.ecommercestore.common.Message;
import com.poly.ecommercestore.repository.AccountRepository;
import com.poly.ecommercestore.repository.EmployerRepository;
import com.poly.ecommercestore.DTO.client.AccountDTO;
import com.poly.ecommercestore.DTO.client.UserDTO;
import com.poly.ecommercestore.service.shared.ECommerceMessage;
import com.poly.ecommercestore.service.user.IUserService;
import com.poly.ecommercestore.service.user.UserService;
import com.poly.ecommercestore.util.ValidateInput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private UserService userService;


    @GetMapping("")
    public ResponseEntity<?> getUser(@RequestHeader("access_token") String tokenHeader){
        return ResponseEntity.ok(userService.getUser(tokenHeader));
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<String> updateUser(@RequestHeader("access_token") String tokenHeader, @PathVariable(value = "id") String idAccount, @RequestBody UserDTO userDTO){

        if(userService.updateUser(tokenHeader, idAccount, userDTO) != null){
            return ResponseEntity.ok(Message.UPDATE_USER_SUCCESS);
        }
        return ResponseEntity.badRequest().body(Message.UPDATE_USER_ERROR001);
    }

    @PostMapping("/updatepassword")
    public ResponseEntity<String> updatePass(@RequestHeader("access_token") String tokenHeader,@RequestBody AccountDTO accountDTO){

        if(accountDTO.getPassword().isEmpty())
        {
            return ResponseEntity.badRequest().body(Message.VALIDATION_PASSWORD_ERROR001);
        }
        if(!ValidateInput.isPasswordValid(accountDTO.getPassword()))
            return ResponseEntity.badRequest().body(Message.VALIDATION_PASSWORD_ERROR002);

        if(userService.updatePassword(tokenHeader, accountDTO))
            return ResponseEntity.ok(Message.UPDATE_PASSWORD_SUCCESS);
        return ResponseEntity.badRequest().body(Message.UPDATE_PASSWORD_ERROR001);
    }

}
