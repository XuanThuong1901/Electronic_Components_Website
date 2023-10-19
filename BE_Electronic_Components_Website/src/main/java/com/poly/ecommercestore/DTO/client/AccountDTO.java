package com.poly.ecommercestore.DTO.client;

import lombok.Data;

@Data
public class AccountDTO {

    private String email;
    private String password;
    private String newPassword;

    public AccountDTO() {
    }

    public AccountDTO(String email, String password, String newPassword) {
        this.email = (email != "") ? email :"N/A";
        this.password = (password != "") ? password :"N/A";
        this.newPassword = (newPassword != "") ? newPassword :"N/A";
    }
}
