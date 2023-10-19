package com.poly.ecommercestore.DTO.system;

import lombok.Data;

@Data
public class PaymentDTO {

    private String paymentName;
    private String contents;

    public PaymentDTO() {
    }

    public PaymentDTO(String paymentName, String contents) {
        this.paymentName = paymentName;
        this.contents = (contents != null) ? contents : "N/A";
    }
}
