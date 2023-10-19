package com.poly.ecommercestore.service.user;

import com.poly.ecommercestore.entity.Accounts;
import com.poly.ecommercestore.DTO.client.UserDTO;
import org.springframework.web.multipart.MultipartFile;

public interface IAuthService {

    boolean createCustomer(UserDTO user);

    boolean createEmployee(UserDTO user, MultipartFile avatar);

    public Accounts getAccountByLogin(String email, String password);

    Boolean resetPassword(String email);
}
