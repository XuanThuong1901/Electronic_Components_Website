package com.poly.ecommercestore.service.token;

import com.poly.ecommercestore.entity.Accounts;

public interface ITokenService {
    public Accounts getAccountByToken(String tokenHeader);
}
