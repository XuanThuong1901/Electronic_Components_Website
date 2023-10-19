package com.poly.ecommercestore.controller.system;

import com.poly.ecommercestore.DTO.system.PaymentDTO;
import com.poly.ecommercestore.common.Message;
import com.poly.ecommercestore.service.payment.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("")
    public ResponseEntity<?> getAllPayment(){
        return ResponseEntity.ok(paymentService.getAllPayment());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPayment(@RequestBody PaymentDTO payment){

        if(payment.getPaymentName() == null || payment.getPaymentName().equals("")){
            return ResponseEntity.badRequest().body(Message.VALIDATION_NAME_PAYMENT_ERROR001);
        }

        if(paymentService.addPayment(payment) != null)
            return ResponseEntity.ok(Message.ADD_PAYMENT_SUCCESS);

        return ResponseEntity.badRequest().body(Message.ADD_PAYMENT_ORDER_ERROR001);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> updatePayment(@RequestBody PaymentDTO payment, @PathVariable(value = "id") int idPayment){

        if(payment.getPaymentName() == null || payment.getPaymentName().equals("")){
            return ResponseEntity.badRequest().body(Message.VALIDATION_NAME_PAYMENT_ERROR001);
        }

        if(paymentService.updatePayment(payment, idPayment) == true)
            return ResponseEntity.ok(Message.UPDATE_PAYMENT_SUCCESS);

        return ResponseEntity.badRequest().body(Message.UPDATE_PAYMENT_ORDER_ERROR001);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePayment(@PathVariable(value = "id") int idPayment){

        if(paymentService.deletePayment(idPayment) == true)
            return ResponseEntity.ok(Message.DELETE_PAYMENT_SUCCESS);

        return ResponseEntity.badRequest().body(Message.DELETE_PAYMENT_ORDER_ERROR001);
    }
}
