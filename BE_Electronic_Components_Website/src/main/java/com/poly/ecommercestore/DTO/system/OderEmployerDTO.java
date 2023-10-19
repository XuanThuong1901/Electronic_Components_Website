package com.poly.ecommercestore.DTO.system;

import com.poly.ecommercestore.DTO.client.DetailOrderDTO;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
public class OderEmployerDTO {

    private BigDecimal price;
    private String address;
    private String telephone;
    private String note;
    private String customer;
    private String employer;
    private Integer shippingUnit;
    private Integer payment;
    private Integer statusOrder;
    private List<DetailOrderDTO> detailOrders;

    public OderEmployerDTO() {
    }

    public OderEmployerDTO(BigDecimal price, String address, String telephone, String note, String customer, String employer, Integer shippingUnit, Integer payment, Integer statusOrder, List<DetailOrderDTO> detailOrders) {
        this.price = (price != null) ? price : null;
        this.address = (address != null) ? address : "N/A";
        this.telephone = (telephone != null) ? telephone : "N/A";
        this.note = (note != null) ? note : "N/A";
        this.customer = (customer != null) ? customer : "N/A";
        this.employer = (employer != null) ? employer : "N/A";
        this.shippingUnit = (shippingUnit != null) ? shippingUnit : 0;
        this.payment = (payment != null) ? payment : 0;
        this.statusOrder = (statusOrder != null) ? statusOrder : 0;
        this.detailOrders = (detailOrders != null) ? new ArrayList<>() : null;
    }
}
