package com.poly.ecommercestore.DTO.system;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class PriceListDTO {

    private  int idprice;
    private String type;
    private Boolean status;
    private Date applicableDate;
    private Date updateDate;
    private BigDecimal price;

    public PriceListDTO() {
    }

    public PriceListDTO(Integer idprice, String type, Boolean status, Date applicableDate, Date updateDate, BigDecimal price) {
        this.idprice = (idprice != null) ? idprice : 0;
        this.type = type;
        this.status = (status != null) ? status : null;
        this.applicableDate = (applicableDate != null) ? applicableDate : null;
        this.updateDate = (updateDate != null) ? updateDate : null;
        this.price = price;
    }
}
