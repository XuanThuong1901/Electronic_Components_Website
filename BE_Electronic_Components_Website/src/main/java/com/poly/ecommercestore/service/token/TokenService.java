package com.poly.ecommercestore.service.token;

import com.poly.ecommercestore.configuration.JWTUnit;
import com.poly.ecommercestore.entity.Accounts;
import com.poly.ecommercestore.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TokenService implements ITokenService{

    @Autowired
    private JWTUnit jwtUnit;

    @Autowired
    private AccountRepository accountRepository;
    @Override
    public Accounts getAccountByToken(String tokenHeader) {
        String token = tokenHeader.replace("Bearer", "");
        String email = jwtUnit.extractEmail(token);
        Accounts account = accountRepository.getByEmail(email);
        return account;
    }
}
