package com.poly.ecommercestore.service.order;

import com.poly.ecommercestore.configuration.JWTUnit;
import com.poly.ecommercestore.entity.*;
import com.poly.ecommercestore.entity.embeddable.DetailOrderId;
import com.poly.ecommercestore.repository.*;
import com.poly.ecommercestore.DTO.client.DetailOrderDTO;
import com.poly.ecommercestore.DTO.client.OrderDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService implements IOrderService{

    @Autowired
    private JWTUnit jwtUnit;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private DetailOrderRepository detailOrderRepository;

    @Autowired
    private  AccountRepository accountRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private ShippingUnitRepository shippingUnitRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    private final int UNCONFIRMED = 3;
    private final int CONFIRMED = 4;
    private final int DELIVERY = 5;
    private final int DELIVERED = 6;
    private final int CANCELED = 7;

    private final int ONE_HUNDRED = 100;

    private final String HANOI = "Hà Nội";
    private final String DANANG = "Đà Nẵng";
    private final String TPHCM = "Hồ Chí Minh";
    private final String EXPORT = "export";

    @Override
    public Orders getOneOrder(String tokenHeader, int iDOrder) {
        return orderRepository.findById(iDOrder).get();
    }

    @Override
    public List<Orders> getOrderByCustomer(String tokenHeader) {
        Accounts accounts = getUserByToken(tokenHeader);
        return orderRepository.getOrderByCustomer(accounts.getCustomers().getIDCustomer());
    }

    @Override
    public List<Orders> getAllOrder(String tokenHeader) {
        Accounts account = getUserByToken(tokenHeader);
        if(account.getEmployer() == null)
            return null;
        return orderRepository.findAll();
    }

    @Transactional
    @Override
    public int addOrder(String tokenHeader, OrderDTO order) {

        if(order.getDetailOrders().size() == 0)
            return 0;
        Accounts account = getUserByToken(tokenHeader);
        ShippingUnits shippingUnit = shippingUnitRepository.getReferenceById(order.getShippingUnit());
        Payments payment = paymentRepository.getReferenceById(order.getPayment());
        Status status = statusRepository.getReferenceById(UNCONFIRMED);

        if(account == null || shippingUnit == null || payment == null || status == null)
            return 0;
        Orders newOrder = new Orders();
        Date dateOrder = new Date();

        newOrder.setAddress(order.getAddress());
        newOrder.setTelephone(order.getTelephone());
        newOrder.setNote(order.getNote());
        newOrder.setDateOrder(dateOrder);
        newOrder.setDiscountAmount(order.getDiscountAmount());
        newOrder.setCustomer(account.getCustomers());
        newOrder.setShippingUnit(shippingUnit);
        newOrder.setPayment(payment);
        newOrder.setStatus(status);

        if(checkAddressShipping(order.getAddress())){
            newOrder.setShippingFee(new BigDecimal(20000));
        }
        else {
            newOrder.setShippingFee(new BigDecimal(30000));
        }
        newOrder = orderRepository.save(newOrder);

        List<DetailOrders> newDetailOrders = new ArrayList<>();
        BigDecimal amount = newOrder.getShippingFee();
        BigDecimal taxAmount = new BigDecimal(0);
        for(DetailOrderDTO detailOrder : order.getDetailOrders()){
            Products product = productRepository.getReferenceById(detailOrder.getProduct());

            if(product == null || product.getQuantity() < detailOrder.getQuantity())
            {
                orderRepository.delete(newOrder);
                return 2;
            }

            Carts cart = cartRepository.getCart(account.getCustomers().getIDCustomer(), product.getIDProduct());
            if(cart == null)
            {
                orderRepository.delete(newOrder);
                return 0;
            }
            cartRepository.delete(cart);
            BigDecimal priceProduct = new BigDecimal(0);
            for (PriceLists priceList : product.getPriceLists()){
                if(priceList.getStatus() && priceList.getType().equalsIgnoreCase(EXPORT)){
                    priceProduct = priceProduct.add(priceList.getPrice());
                }
            }
            System.out.printf("5");
//            BigDecimal countTax = countTax(priceProduct, product.getTax().getTaxPercentage());
            BigDecimal lineAmount = priceProduct.multiply(BigDecimal.valueOf(detailOrder.getQuantity()));
            taxAmount = taxAmount.add(lineAmount.multiply(BigDecimal.valueOf(((double) product.getTax().getTaxPercentage()/100.0))));

            DetailOrderId detailOrderId = new DetailOrderId(newOrder.getIDOrder(), product.getIDProduct());
            DetailOrders detailOrderTemp = new DetailOrders(detailOrderId, detailOrder.getQuantity(), priceProduct, lineAmount, newOrder, product, product.getTax());

            System.out.printf("\n6");

            newDetailOrders.add(detailOrderTemp);
            amount = amount.add(lineAmount);
            product.setQuantity(product.getQuantity() - detailOrder.getQuantity());
            productRepository.save(product);
            System.out.printf("\n6");
            detailOrderRepository.save(detailOrderTemp);
            System.out.printf("\n10\n");
        }
        System.out.printf("\n6\n");

        amount = amount.add(taxAmount);
        System.out.printf("\n7");
        newOrder.setAmount(amount);
        System.out.printf("\n7");
        newOrder.setTaxAmount(taxAmount);
        System.out.printf("\n7");
        newOrder.setDetailOrders(newDetailOrders);
        System.out.printf("\n7");

        orderRepository.save(newOrder);
        System.out.printf("\n8");
        return 1;
    }

    @Override
    public Boolean statusConfirmedOrder(String tokenHeader, int iDOrder) {

        Accounts account = getUserByToken(tokenHeader);
        Orders order = orderRepository.getReferenceById(iDOrder);
        if(account == null || order == null)
            return false;
        if(order.getEmployer() == null)
            order.setEmployer(account.getEmployer());
        if(order.getStatus().getIDStatus() == UNCONFIRMED){
            order.setStatus(statusRepository.getReferenceById(CONFIRMED));
            orderRepository.save(order);

            return true;
        }

        return false;
    }

    @Override
    public Boolean statusDeliveryOrder(String tokenHeader, int iDOrder) {
        Accounts account = getUserByToken(tokenHeader);
        Orders order = orderRepository.getReferenceById(iDOrder);
        if(account == null || order == null)
            return false;

        if(order.getStatus().getIDStatus() == CONFIRMED){
            order.setStatus(statusRepository.getReferenceById(DELIVERY));
            orderRepository.save(order);

            return true;
        }

        return false;
    }

    @Override
    public Boolean statusDeliveredOrder(String tokenHeader, int iDOrder) {
        Accounts account = getUserByToken(tokenHeader);
        Orders order = orderRepository.getReferenceById(iDOrder);
        if(account == null || order == null)
            return false;

        if(order.getStatus().getIDStatus() == DELIVERY){
            order.setStatus(statusRepository.getReferenceById(DELIVERED));
            orderRepository.save(order);

            return true;
        }

        return false;
    }

    @Override
    public Boolean statusCanceledOrder(String tokenHeader, int iDOrder) {
        Accounts account = getUserByToken(tokenHeader);
        Orders order = orderRepository.getReferenceById(iDOrder);
        if(account == null || order == null)
            return false;

        if(order.getStatus().getIDStatus() == UNCONFIRMED ||order.getStatus().getIDStatus() == CONFIRMED){

            Status status = statusRepository.findById(CANCELED).get();
            order.setStatus(status);
            for (DetailOrders detailOrder : order.getDetailOrders()){

                Products product = detailOrder.getProduct();
                product.setQuantity(product.getQuantity() + detailOrder.getQuantity());

                productRepository.save(product);
            }
            orderRepository.save(order);
            return true;
        }

        return false;
    }

    private Boolean checkAddressShipping(String address){
        if(address.contains(HANOI))
            return true;
        if(address.contains(DANANG))
            return true;
        if(address.contains(TPHCM))
            return true;

        return false;
    }

//    private BigDecimal countTax(BigDecimal price, int taxPercentage){
//        return price.multiply(BigDecimal.valueOf(taxPercentage/ONE_HUNDRED));
//    }

    private Accounts getUserByToken(String tokenHeader){
        String token = tokenHeader.replace("Bearer ", "");
        String email = jwtUnit.extractEmail(token);
        Accounts account = accountRepository.getByEmail(email);
        return  account;
    }
}
