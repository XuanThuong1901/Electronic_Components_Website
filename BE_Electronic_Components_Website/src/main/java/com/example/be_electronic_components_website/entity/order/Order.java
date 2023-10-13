package com.example.be_electronic_components_website.entity.order;

import com.example.be_electronic_components_website.entity.Enum.OrderStatus;
import com.example.be_electronic_components_website.entity.PaymentMethod;
import com.example.be_electronic_components_website.entity.ShippingUnit;
import com.example.be_electronic_components_website.entity.user.Customer;
import com.example.be_electronic_components_website.entity.user.Employee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "address")
    private String address;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "note")
    private String note;

    @Column(name = "dateOrdered")
    private Date dateOrdered;

    @Column(name = "estimatedDeliveryDate")
    private Date estimatedDeliveryDate;

    @Column(name = "dateUpdate")
    private Date dateUpdate;

    @Column(name = "shippingFee")
    private BigDecimal shippingFee;

    @Column(name = "taxAmount ")
    private BigDecimal taxAmount  ;

    @Column(name = "discountAmount")
    private BigDecimal discountAmount ;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

//    @JsonIgnoreProperties("order")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "customerId")
    private Customer customer;

//    @JsonIgnoreProperties("order")
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "employee")
    private Employee employee;

//    @JsonIgnoreProperties("order")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "shippingUnitId")
    private ShippingUnit shippingUnit;

//    @JsonIgnoreProperties("order")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "paymentId")
    private PaymentMethod payment;

//    @JsonIgnoreProperties("order")
    @OneToMany(mappedBy = "order")
    private List<DetailOrder> detailOrders;

    @PrePersist
    private void pre(){
        this.dateOrdered = new Date();
        this.status = OrderStatus.NEW;
    }
}
