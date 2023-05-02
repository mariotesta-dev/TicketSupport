package it.polito.wa2.server.warranties

import org.springframework.web.bind.annotation.*

@RestController
class WarrantyController(private val warrantyService: WarrantyService) {

    @GetMapping("/API/warranties/{warrantyId}")
    fun getWarrantyById(@PathVariable warrantyId: Long) : WarrantyDTO {
        return warrantyService.getWarrantyById(warrantyId)
    }

    /*
    TODO INSIDE PRODUCTS API "/API/products/{productId}/warranty"
    Use case: Manager/Expert wants to see the warranty of a product
    @GetMapping("/API/warranties/{product}")
    fun getWarrantyByProduct(@PathVariable product: String) : WarrantyDTO {
        return warrantyService.getWarrantyByProduct(product)
    } */

    // Use case: Product gets bought, a Warranty without customer is created
    @PostMapping("/API/warranties")
    fun createWarranty(@RequestBody warranty: Warranty) : WarrantyDTO {
        return warrantyService.createWarranty(warranty)
    }

    // Use case: Customer subscribes its purchase using product_ean
    // -> customer column of Warranty related to product_ean needs to be updated
    /* TODO maybe it's better to have a POST function like: subscribeProduct() that only adds the field "product_ean"
    TODO    same for extendWarranty() ... it's better to avoid having a public API able to edit all the fields */
    @PutMapping("API/warranties/{warrantyId}")
    fun editWarranty(@PathVariable warrantyId: Long, @RequestBody warranty: Warranty) : WarrantyDTO {
        return warrantyService.editWarranty(warrantyId, warranty)
    }
}