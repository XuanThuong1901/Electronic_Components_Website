package com.example.be_electronic_components_website.services.account;

import com.example.be_electronic_components_website.common.Message;
import com.example.be_electronic_components_website.common.Random;
import com.example.be_electronic_components_website.util.Validator.ValidateInput;
import com.example.be_electronic_components_website.configuration.Jwt.JwtService;
import com.example.be_electronic_components_website.entity.user.Account;
import com.example.be_electronic_components_website.entity.user.Customer;
import com.example.be_electronic_components_website.entity.user.Employee;
import com.example.be_electronic_components_website.entity.Enum.Role;
import com.example.be_electronic_components_website.model.request.LoginRequest;
import com.example.be_electronic_components_website.model.request.RegisterRequest;
import com.example.be_electronic_components_website.model.response.LoginResponse;
import com.example.be_electronic_components_website.model.response.RegisterResponse;
import com.example.be_electronic_components_website.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements IAccountService{

    private final PasswordEncoder passwordEncoder;

    private final AccountRepository repository;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    @Override
    public RegisterResponse register(RegisterRequest request, String typeAccount) {

        Account account = repository.findByEmail(request.getEmail()).get();
        if(account != null){
            return RegisterResponse.builder()
                    .message(Message.VALIDATION_EMAIL_ERROR003)
                    .build();
        }

        try {
            if(typeAccount.equals("CUS"))
            {
                String id = "CUS" + Random.randomNumber();
                var customer = Customer.builder()
                        .fullName(request.getFullName())
                        .address(request.getAddress())
                        .phoneNumber(request.getPhoneNumber())
                        .build();

                var newAccount = Account.builder()
                        .id(id)
                        .email(request.getEmail())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .role(Role.CUSTOMER)
                        .customer(customer)
                        .build();

                repository.save(newAccount);
                var jwtToken = jwtService.generateToken(newAccount);

                return RegisterResponse.builder()
                        .message(Message.REGISTER_SUCCESS)
                        .token(jwtToken)
                        .build();
            }

            else
            {
                String id = "EMP" + Random.randomNumber();
                var employee = Employee.builder()
                        .fullName(request.getFullName())
                        .address(request.getAddress())
                        .phoneNumber(request.getPhoneNumber())
                        .build();

                var newAccount = Account.builder()
                        .id(id)
                        .email(request.getEmail())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .role(Role.valueOf(request.getRole()))
                        .employee(employee)
                        .build();

                repository.save(newAccount);
                var jwtToken = jwtService.generateToken(newAccount);

                return RegisterResponse.builder()
                        .message(Message.REGISTER_SUCCESS)
                        .token(jwtToken)
                        .build();
            }
        }
        catch (Exception e){
            return RegisterResponse.builder()
                    .message(Message.REGISTER_ERROR001)
                    .build();
        }
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        if(request.getEmail().isEmpty())
        {
            return LoginResponse.builder()
                    .message(Message.VALIDATION_EMAIL_ERROR001)
                    .build();
        }
        if(request.getPassword().isEmpty())
        {
            return LoginResponse.builder()
                    .token(Message.VALIDATION_PASSWORD_ERROR001)
                    .build();
        }
        if(ValidateInput.containsGmail(request.getEmail()))
        {
            return LoginResponse.builder()
                    .message(Message.VALIDATION_EMAIL_ERROR002)
                    .build();
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                        request.getPassword()
                )
        );
        var account = repository.findByEmail(request.getEmail()).get();

        if(account == null){
            return LoginResponse.builder()
                    .message(Message.LOGIN_ERROR001)
                    .build();
        }

        var jwtToken = jwtService.generateToken(account);
        return LoginResponse.builder()
                .account(account)
                .token(jwtToken)
                .message(Message.LOGIN_SUCCESS)
                .build();
    }
}
