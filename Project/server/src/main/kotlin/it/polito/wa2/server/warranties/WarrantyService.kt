package it.polito.wa2.server.warranties

import it.polito.wa2.server.customers.Customer
import java.time.LocalDate

interface WarrantyService {
    fun getWarrantyByEan(ean: String) : WarrantyDTOWithoutCustomer

    fun createWarranty(warranty: Warranty) : WarrantyDTO

    fun subscribeProduct(warrantyId: Long, customer: Customer) : WarrantyDTO
    fun extendWarranty(warrantyId: Long, extension: WarrantyController.Extension) : WarrantyDTO
}