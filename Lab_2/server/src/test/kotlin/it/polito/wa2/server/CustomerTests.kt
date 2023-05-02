package it.polito.wa2.server

import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.customers.CustomerDTO
import it.polito.wa2.server.customers.CustomerRepository
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus

class CustomerTests : DbT1ApplicationTests() {

    @Autowired
    lateinit var customerRepository: CustomerRepository

    @Test
    fun `Get customer by email`() {
        // Create a sample customer
        val customer = Customer().apply {
            email = "john.smith@example.com"
            name = "John"
            surname = "Smith"
        }
        customerRepository.save(customer)

        // Make an HTTP GET request to /API/customers/{email}
        val response = restTemplate.getForEntity<CustomerDTO>("/API/customers/${customer.email}", CustomerDTO::class.java)

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.OK, response.statusCode)
        Assertions.assertEquals(customer.email, response.body?.email)
        Assertions.assertEquals(customer.name, response.body?.name)
        Assertions.assertEquals(customer.surname, response.body?.surname)
    }

    @Test
    fun `Get non-existent customer by email`() {
        // Non-existent customer email
        val nonExistentEmail = "nonexistent@example.com"

        // Make an HTTP GET request to /API/customers/{email}
        val response = restTemplate.getForEntity<String>("/API/customers/$nonExistentEmail", String::class.java)

        // Verify the response status and content
        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertTrue(response.body?.contains("Customer with email $nonExistentEmail not found") == true)
    }

}
