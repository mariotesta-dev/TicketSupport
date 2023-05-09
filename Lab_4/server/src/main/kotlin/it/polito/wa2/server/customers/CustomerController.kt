package it.polito.wa2.server.customers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class CustomerController(private val customerService: CustomerService) {

    @GetMapping("/API/customers/{email}")
    fun getCustomer(@PathVariable email: String) =
        customerService.getCustomer(email)

    @PostMapping("/API/customers")
    fun createCustomer(@RequestBody customer: Customer) =
        customerService.createCustomer(customer)

    @PutMapping("/API/customers/{email}")
    fun updateCustomer(@PathVariable email: String, @RequestBody customer: Customer) =
        customerService.updateCustomer(email, customer)
}