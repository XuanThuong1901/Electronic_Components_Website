package com.poly.ecommercestore.repository;

import com.poly.ecommercestore.entity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Accounts, String> {

    Optional<Accounts> findByEmail(String email);

}
