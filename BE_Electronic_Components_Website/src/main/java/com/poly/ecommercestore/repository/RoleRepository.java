package com.poly.ecommercestore.repository;

import com.poly.ecommercestore.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Roles, Integer> {

    @Query("SELECT role FROM Roles role WHERE role.iDRole = :iDRole")
    public Roles getRoleById(@Param("iDRole") int iDRole);
}
