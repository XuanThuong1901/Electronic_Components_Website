package com.poly.ecommercestore.service.user;

import com.poly.ecommercestore.entity.Accounts;
import com.poly.ecommercestore.DTO.client.AccountDTO;
import com.poly.ecommercestore.DTO.client.UserDTO;

public interface IUserService {

    public Object getUser(String tokenHeader);

    public Object updateUser(String tokenHeader, String idAccount, UserDTO user);

    public Boolean updatePassword(String tokenHeader, AccountDTO account);

//    public Boolean setWorkingUser(String tokenHeader, String idAccount);

    public Boolean setStatusUser(String tokenHeader, String idAccount, int idStatus);
}
