package it.polito.wa2.server.warranties

interface WarrantyService {
    fun getWarrantyById(warrantyId: Long) : WarrantyDTO
    fun getWarrantyByProduct(productEan: String) : WarrantyDTO
    fun createWarranty(warranty: Warranty) : WarrantyDTO
    fun editWarranty(warrantyId: Long, warranty: Warranty) : WarrantyDTO
}