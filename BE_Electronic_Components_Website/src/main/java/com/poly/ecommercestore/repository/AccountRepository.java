package com.poly.ecommercestore.repository;

import com.poly.ecommercestore.entity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Accounts, String> {

    @Query("SELECT account FROM Accounts account WHERE account.iDAccount = :iDAccount")
    Accounts getById(String iDAccount);

    @Query("SELECT account FROM Accounts account WHERE account.email = :email")
    Accounts getByEmail(@Param("email") String email);

    @Query("SELECT account FROM Accounts account WHERE account.email = :email and account.password = :password")
    Accounts findByLogin(String email, String password);
}
