package com.example.be_electronic_components_website.entity;

import com.example.be_electronic_components_website.entity.Enum.CommonStatus;
import com.example.be_electronic_components_website.entity.order.Order;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "paymentMethod")
public class PaymentMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    @NonNull
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "isOnlinePayment")
    private Boolean isOnlinePayment;

    @Column(name = "additionalInformation")
    private String additionalInformation;

    @Column(name = "dateAdded")
    private Date dateAdded;

    @Column(name = "endDate")
    private Date endDate;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private CommonStatus status;

    @OneToMany(mappedBy = "payment", fetch = FetchType.LAZY)
    private List<Order> order;

    @PrePersist
    private void dateAdd(){
        this.dateAdded = new Date();
        this.status = CommonStatus.ACTIVE;
    }
}
