package it.polito.wa2.server.warranties

import it.polito.wa2.server.customers.Customer
import java.time.LocalDate

interface WarrantyService {

    // not used
    fun getWarrantyByEan(productEan: String) : WarrantyDTO
    fun createWarranty(warranty: Warranty) : WarrantyDTO
    fun subscribeProduct(productEan: String, customer: Customer) : WarrantyDTO
    fun extendWarranty(productEan: String, extension: WarrantyController.Extension) : WarrantyDTO
}