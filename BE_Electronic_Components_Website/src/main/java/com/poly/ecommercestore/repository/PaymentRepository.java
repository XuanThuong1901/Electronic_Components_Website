package com.poly.ecommercestore.repository;

import com.poly.ecommercestore.entity.Payments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payments, Integer> {

    @Query("SELECT payment FROM Payments payment WHERE payment.paymentName = :paymentName")
    public Payments getPaymentsByName(@Param("paymentName") String paymentName);

}
