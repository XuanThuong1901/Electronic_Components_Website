package com.poly.ecommercestore.repository;

import com.poly.ecommercestore.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusRepository extends JpaRepository<Status, Integer> {

    @Query("SELECT status FROM Status status WHERE status.iDStatus = :iDStatus")
    public Status getStatusById(@Param("iDStatus") int iDStatus);

    @Query("SELECT status FROM Status status WHERE status.type = :type")
    public List<Status> getStatusByType(@Param("type") String type);
}
