package com.example.be_electronic_components_website.repository;

import com.example.be_electronic_components_website.entity.user.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {

    Optional<Account> findByEmail(String email);

    Boolean existsByEmail(String email);
}
