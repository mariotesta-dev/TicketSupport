package it.polito.wa2.server.warranties

import it.polito.wa2.server.customers.Customer
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@RestController
class WarrantyController(private val warrantyService: WarrantyService) {

    // This must be accessible by all authenticated users
    @GetMapping("/API/warranties/{ean}")
    fun getWarrantyByEan(@PathVariable ean: String) : WarrantyDTO {
        return warrantyService.getWarrantyByEan(ean)
    }

    // This must be accessible only by the customer (?)
    @PostMapping("/API/warranties")
    fun createWarranty(@RequestBody warranty: Warranty) : WarrantyDTO {
        return warrantyService.createWarranty(warranty)
    }

    // This must be accessible only by the customer
    @PutMapping("/API/warranties/{warrantyId}/subscribe")
    fun subscribeProduct(@PathVariable warrantyId: Long, @RequestBody customer: Customer) : WarrantyDTO {
        return warrantyService.subscribeProduct(warrantyId, customer)
    }

    data class Extension(
        val newEndOfWarranty: LocalDate = LocalDate.now()
    )

    // This must be accessible only by the expert
    @PutMapping("/API/warranties/{warrantyId}/extend")
    fun extendWarranty(@PathVariable warrantyId: Long, @RequestBody extension: Extension) : WarrantyDTO {
        return warrantyService.extendWarranty(warrantyId, extension)
    }

}