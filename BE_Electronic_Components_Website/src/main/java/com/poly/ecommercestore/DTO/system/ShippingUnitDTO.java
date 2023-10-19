package com.poly.ecommercestore.DTO.system;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ShippingUnitDTO {

    private String shippingUnitName;

    private String email;

    private String telephone;

    private String address;

//    private BigDecimal shippingCost;

    public ShippingUnitDTO() {
    }

    public ShippingUnitDTO(String shippingUnitName, String email, String telephone, String address) {
        this.shippingUnitName = (shippingUnitName != "") ? shippingUnitName : "N/A";
        this.email = (email != "") ? email : "N/A";
        this.telephone = (telephone != "") ? telephone : "N/A";
        this.address = (address != "") ? address : "N/A";
//        this.shippingCost = shippingCost;
    }

}
