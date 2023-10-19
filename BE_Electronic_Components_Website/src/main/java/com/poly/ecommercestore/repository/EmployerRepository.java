package com.poly.ecommercestore.repository;

import com.poly.ecommercestore.entity.Employers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployerRepository extends JpaRepository<Employers, String> {

    @Query("SELECT employer FROM Employers employer WHERE employer.iDEmployer = :iDEmployer")
    public Employers getEmployersById(@Param("iDEmployer") String iDEmployer);
}
