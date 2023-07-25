package it.polito.wa2.server.warranties

import it.polito.wa2.server.customers.Customer
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@RestController
class WarrantyController(private val warrantyService: WarrantyService) {

    // This must be accessible by all authenticated users
    @GetMapping("/API/warranties/{ean}")
    fun getWarrantyByProduct(@PathVariable ean: String) : WarrantyDTO {
        return warrantyService.getWarrantyByProduct(ean)
    }

    // This must be accessible only by the customer (?)
    @PostMapping("/API/warranties")
    fun createWarranty(@RequestBody warranty: Warranty) : WarrantyDTO {
        return warrantyService.createWarranty(warranty)
    }

    // This must be accessible only by the customer
    @PutMapping("/API/warranties/{ean}/subscribe")
    fun subscribeProduct(@PathVariable ean: String, @RequestBody customer: Customer) : WarrantyDTO {
        return warrantyService.subscribeProduct(ean, customer)
    }

    data class Extension(
        val newEndOfWarranty: LocalDate = LocalDate.now()
    )

    // This must be accessible only by the expert
    @PutMapping("/API/warranties/{ean}/extend")
    fun extendWarranty(@PathVariable ean: String, @RequestBody extension: Extension) : WarrantyDTO {
        return warrantyService.extendWarranty(ean, extension)
    }

}