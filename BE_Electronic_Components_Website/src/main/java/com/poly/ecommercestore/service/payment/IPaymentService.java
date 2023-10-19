package com.poly.ecommercestore.service.payment;

import com.poly.ecommercestore.entity.Payments;
import com.poly.ecommercestore.DTO.system.PaymentDTO;

import java.util.List;

public interface IPaymentService {

    List<Payments> getAllPayment();

    Payments addPayment(PaymentDTO payment);

    Boolean updatePayment(PaymentDTO payment, int iDPayment);

    Boolean deletePayment(int iDPayment);
}
