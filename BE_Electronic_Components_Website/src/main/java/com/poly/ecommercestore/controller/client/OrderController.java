package com.poly.ecommercestore.controller.client;

import com.poly.ecommercestore.DTO.client.OrderDTO;
import com.poly.ecommercestore.common.Message;
import com.poly.ecommercestore.service.order.OrderService;
import com.poly.ecommercestore.util.ValidateInput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;


    @GetMapping("")
    public ResponseEntity<?> getAllOrderByCustomer(@RequestHeader("access_token") String tokenHeader){
        return ResponseEntity.ok(orderService.getOrderByCustomer(tokenHeader));
    }

    @GetMapping("/detail/{idOrder}")
    public ResponseEntity<?> getOneOrder(@RequestHeader("access_token") String tokenHeader,@PathVariable(value = "idOrder") int idOrder){
        return ResponseEntity.ok(orderService.getOneOrder(tokenHeader, idOrder));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addOrder(@RequestHeader("access_token") String tokenHeader, @RequestBody OrderDTO order){

        if(order.getDetailOrders().size() == 0)
            return ResponseEntity.badRequest().body(Message.VALIDATION_DETAIL_ORDER_ERROR001);
        if(order.getAddress() == null || order.getAddress().equals(""))
            return ResponseEntity.badRequest().body(Message.VALIDATION_ADDRESS_ORDER_ERROR001);
        if(order.getTelephone() == null || order.getTelephone().equals(""))
            return ResponseEntity.badRequest().body(Message.VALIDATION_TELEPHONE_ORDER_ERROR001);
        if(order.getShippingUnit() == null)
            return ResponseEntity.badRequest().body(Message.VALIDATION_SHIPPING_UNIT_ORDER_ERROR001);
        if(order.getPayment() == null)
            return ResponseEntity.badRequest().body(Message.VALIDATION_PAYMENT_ORDER_ERROR001);

        if(!ValidateInput.isPhoneNumber(order.getTelephone()))
            return ResponseEntity.badRequest().body(Message.VALIDATION_TELEPHONE_ORDER_ERROR002);

        if(orderService.addOrder(tokenHeader, order) == null){
            return ResponseEntity.badRequest().body(Message.ORDER_ERROR001);
        }

        return ResponseEntity.ok(Message.ORDER_SUCCESS);
    }

    @GetMapping("/canceled/{id}")
    public ResponseEntity<?> canceledOrder(@RequestHeader("access_token") String tokenHeader, @PathVariable(value = "id") int idOrder){

        if(orderService.statusCanceledOrder(tokenHeader, idOrder))
            return ResponseEntity.ok(Message.CANCELED_ORDER_SUCCESS);

        return ResponseEntity.badRequest().body(Message.VALIDATION_CANCELED_ORDER_ERROR001);
    }
}
