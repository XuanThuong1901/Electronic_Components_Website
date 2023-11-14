package com.poly.ecommercestore.repository;

import com.poly.ecommercestore.entity.Carts;
import com.poly.ecommercestore.entity.ImportStocks;
import com.poly.ecommercestore.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Integer> {

    @Query("SELECT order FROM Orders order WHERE order.customer.iDCustomer = :iDCustomer")
    public List<Orders> getOrderByCustomer(@Param("iDCustomer") String iDCustomer);

    @Query("SELECT order FROM Orders order WHERE order.dateOrder BETWEEN :startDay AND :endDay")
    List<Orders> findByStartEndDay(Date startDay, Date endDay);
}
