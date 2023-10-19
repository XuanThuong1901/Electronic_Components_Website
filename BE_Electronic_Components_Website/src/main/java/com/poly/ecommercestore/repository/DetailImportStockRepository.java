package com.poly.ecommercestore.repository;

import com.poly.ecommercestore.entity.DetailImportStocks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DetailImportStockRepository extends JpaRepository<DetailImportStocks, Integer> {

    @Query("SELECT detailImportStock FROM DetailImportStocks detailImportStock WHERE detailImportStock.importStock.iDImportStock = :iDImportStock")
    public List<DetailImportStocks> getDetailImportStocks(int iDImportStock);
}
