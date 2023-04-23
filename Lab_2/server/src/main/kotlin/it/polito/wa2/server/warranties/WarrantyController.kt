package it.polito.wa2.server.warranties

import it.polito.wa2.server.profiles.ProfileService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class WarrantyController(private val warrantyService: WarrantyService) {

    @ExceptionHandler(NoSuchElementException::class)
    fun handleNoWarrantyFound(e: NoSuchElementException) : ResponseEntity<String> =
        ResponseEntity(e.message, HttpStatus.NOT_FOUND)

    @GetMapping("/API/warranties")
    fun getAll() : List<WarrantyDTO> {
        return warrantyService.getAll()
    }

    @GetMapping("/API/warranties/{customerId}")
    fun getAll(@PathVariable customerId: Long) : List<WarrantyDTO>? {
        return warrantyService.getAllWarrantiesByCustomer(customerId)
    }
}