package com.poly.ecommercestore.service.cart;

import com.poly.ecommercestore.configuration.JWTUnit;
import com.poly.ecommercestore.entity.Carts;
import com.poly.ecommercestore.entity.Customers;
import com.poly.ecommercestore.entity.Products;
import com.poly.ecommercestore.entity.embeddable.CartId;
import com.poly.ecommercestore.repository.CartRepository;
import com.poly.ecommercestore.repository.CustomerRepository;
import com.poly.ecommercestore.repository.ProductRepository;
import com.poly.ecommercestore.DTO.client.CartDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CartService implements ICartService{


    @Autowired
    private JWTUnit jwtUnit;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    private final Boolean SELECT_STATE = false;

    @Override
    public List<Carts> getCartByCustomer(String tokenHeader) {
        String token = tokenHeader.replace("Bearer ", "");
        String email = jwtUnit.extractEmail(token);
        Customers customer = customerRepository.getCustomersByEmail(email);
        System.out.printf("name"+customer.getName());
        if(customer == null)
            return null;
        return cartRepository.getCartCustomer(customer.getIDCustomer());
    }

    @Override
    public Carts addCart(String tokenHeader, int iDProduct, CartDTO cartDTO) {
        Customers customer = getCustomer(tokenHeader);
//        System.out.printf("name"+customer.getName());
        if(customer == null)
            return null;

        Products product = productRepository.getReferenceById(iDProduct);
        if(product == null)
            return null;

        Date dateUpdate = new Date();

        Carts newCart = cartRepository.getCart(customer.getIDCustomer(), product.getIDProduct());
        if(newCart == null){
            CartId cartId = new CartId(customer.getIDCustomer(), product.getIDProduct());
            newCart = new Carts(cartId, SELECT_STATE, dateUpdate, cartDTO.getQuantity(), customer, product);
        }
        else {
            newCart.setQuantity(newCart.getQuantity() + cartDTO.getQuantity());
            newCart.setUpdatedDate(dateUpdate);
        }

        cartRepository.save(newCart);

        return newCart;
    }

    @Override
    public Boolean deleteCart(String tokenHeader, int iDProduct) {
        Customers customer = getCustomer(tokenHeader);
        Carts cart = cartRepository.getCart(customer.getIDCustomer(), iDProduct);
        if(cart == null)
            return false;

        cartRepository.delete(cart);
        return true;
    }

    @Override
    public Boolean updateCart(String tokenHeader, int iDProduct, CartDTO cartRequest) {
        Customers customer = getCustomer(tokenHeader);
        Carts cart = cartRepository.getCart(customer.getIDCustomer(), iDProduct);
        if(cart == null)
            return false;

        cart.setQuantity(cartRequest.getQuantity());

        if(cartRepository.save(cart) == null)
            return false;

        return true;
    }

    @Override
    public List<Carts> selectCart(String iDCustomer, List<CartDTO> cart) {

//        List<Carts> cartList = cartRepository.getCartCustomer(iDCustomer);
//        if(cartList == null)
//            return null;
//
//        for (CartRequest c : cart){
//            if(c.)
//        }

        return null;
    }

    private Customers getCustomer(String tokenHeader){
        String token = tokenHeader.replace("Bearer ", "");
        String email = jwtUnit.extractEmail(token);
        Customers customer = customerRepository.getCustomersByEmail(email);
        return  customer;
    }
}
