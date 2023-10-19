package com.poly.ecommercestore.service.payment;

import com.poly.ecommercestore.entity.Payments;
import com.poly.ecommercestore.repository.PaymentRepository;
import com.poly.ecommercestore.DTO.system.PaymentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService implements IPaymentService{

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public List<Payments> getAllPayment() {
        return paymentRepository.findAll();
    }

    @Override
    public Payments addPayment(PaymentDTO payment) {
        if(paymentRepository.getPaymentsByName(payment.getPaymentName()) != null)
            return null;

        Payments newPayment = new Payments(payment.getPaymentName(), payment.getContents());

        if(paymentRepository.save(newPayment) == null)
            return null;

        return newPayment;
    }

    @Override
    public Boolean updatePayment(PaymentDTO payment, int iDPayment) {

        Payments updatePayment = paymentRepository.getReferenceById(iDPayment);
        if(updatePayment == null)
            return false;

        updatePayment.setPaymentName(payment.getPaymentName());
        updatePayment.setContents(payment.getContents());

        if(paymentRepository.save(updatePayment) == null)
            return false;

        return true;
    }

    @Override
    public Boolean deletePayment(int iDPayment) {
        Payments payment = paymentRepository.getReferenceById(iDPayment);

        if(payment == null)
            return false;

        paymentRepository.delete(payment);
        return true;
    }
}
