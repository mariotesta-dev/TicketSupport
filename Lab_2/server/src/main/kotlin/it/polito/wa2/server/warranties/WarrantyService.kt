package it.polito.wa2.server.warranties

import it.polito.wa2.server.profiles.Profile

interface WarrantyService {
    fun getAll() : List<WarrantyDTO>
    fun getWarranty(warrantyId: Long) : WarrantyDTO
    fun getAllWarrantiesByCustomer(customer: Long) : List<WarrantyDTO>
}