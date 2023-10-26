package com.poly.ecommercestore.repository;

import com.poly.ecommercestore.entity.Products;
import com.poly.ecommercestore.entity.Suppliers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Products, Integer> {

    @Query("SELECT product FROM Products product WHERE product.category.iDCategory = :iDCategory")
    List<Products> getProductsByCategory(@Param("iDCategory") int iDCategory);

//    @Query("SELECT TOP 6 product FROM Products product WHERE product.category.iDCategory = :iDCategory")
//    List<Products> getProductsByCategoryTop6(@Param("iDCategory") int iDCategory);

    @Query(value = "SELECT * FROM Products WHERE idcategory = :iDCategory ORDER BY idproduct OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY", nativeQuery = true)
    List<Products> getProductsByCategoryByPage(@Param("iDCategory") int iDCategory, @Param("offset") int offset, @Param("size") int size);

    @Query(value = "SELECT * FROM Products ORDER BY idproduct OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY", nativeQuery = true)
    List<Products> getProductsByPage(@Param("offset") int offset, @Param("size") int size);

    @Query("SELECT product FROM Products product WHERE product.productName = :productName")
    public Products getProductByName(@Param("productName") String productName);

//    @Query("SELECT product FROM Products product WHERE product.productName = :productName")
//    public Products getProductByName(@Param("productName") String productName);

//    @Query("SELECT product FROM Products product WHERE product.productName = :productName AND product.supplier= :supplier")
//    public Products checkProduct(@Param("isSupplier") Suppliers supplier, @Param("productName") String productName);

}
