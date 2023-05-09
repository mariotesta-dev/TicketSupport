package it.polito.wa2.server.warranties

import it.polito.wa2.server.customers.Customer
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@RestController
class WarrantyController(private val warrantyService: WarrantyService) {

    @GetMapping("/API/warranties/{warrantyId}")
    fun getWarrantyById(@PathVariable warrantyId: Long) : WarrantyDTO {
        return warrantyService.getWarrantyById(warrantyId)
    }

    @PostMapping("/API/warranties")
    fun createWarranty(@RequestBody warranty: Warranty) : WarrantyDTO {
        return warrantyService.createWarranty(warranty)
    }

    @PutMapping("/API/warranties/{warrantyId}/customer")
    fun subscribeProduct(@PathVariable warrantyId: Long, @RequestBody customer: Customer) : WarrantyDTO {
        return warrantyService.subscribeProduct(warrantyId, customer)
    }

    data class Extension(
        val newEndOfWarranty: LocalDate = LocalDate.now()
    )

    @PutMapping("/API/warranties/{warrantyId}/extend")
    fun extendWarranty(@PathVariable warrantyId: Long, @RequestBody extension: Extension) : WarrantyDTO {
        return warrantyService.extendWarranty(warrantyId, extension)
    }

}