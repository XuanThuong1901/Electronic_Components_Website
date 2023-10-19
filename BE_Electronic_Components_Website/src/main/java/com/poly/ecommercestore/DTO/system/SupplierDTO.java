package com.poly.ecommercestore.DTO.system;

import lombok.Data;

@Data
public class SupplierDTO {

    private String supplierName;

    private String email;

    private String telephone;

    private String address;

    public SupplierDTO() {
    }

    public SupplierDTO(String supplierName, String email, String telephone, String address) {
        this.supplierName = (supplierName != "") ? supplierName : "N/A";
        this.email = (email != "") ? email : "N/A";
        this.telephone = (telephone != "") ? telephone : "N/A";
        this.address = (address != "") ? address : "N/A";
    }
}
