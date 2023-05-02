package it.polito.wa2.server.warranties

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface WarrantyRepository : JpaRepository<Warranty, Long> {

    @Query(value = "SELECT w from Warranty w WHERE w.product.ean = :productEan")
    fun getWarrantyByProductEan(productEan : String): Warranty?
}