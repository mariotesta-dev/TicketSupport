package it.polito.wa2.server.warranties

import it.polito.wa2.server.customers.Customer
import java.time.LocalDate

interface WarrantyService {
    fun getWarrantyById(warrantyId: Long) : WarrantyDTO
    fun getWarrantyByProduct(productEan: String) : WarrantyDTO
    fun createWarranty(warranty: Warranty) : WarrantyDTO

    fun subscribeProduct(warrantyId: Long, customer: Customer) : WarrantyDTO
    fun extendWarranty(warrantyId: Long, extension: WarrantyController.Extension) : WarrantyDTO
}