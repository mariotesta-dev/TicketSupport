package it.polito.wa2.server

import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.customers.CustomerDTO
import it.polito.wa2.server.customers.CustomerRepository
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.*
import org.springframework.test.annotation.DirtiesContext


@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class CustomerTests : DbT1ApplicationTests() {

    @Autowired
    lateinit var customerRepository: CustomerRepository


    @Test
    fun `Create new customer`() {
        val customer = Customer().apply {
            email = "john.smith@example.com"
            name = "John"
            surname = "Smith"
        }

        // Make an HTTP POST request to /API/customers
        val headers : HttpHeaders = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_JSON
        }
        val request : HttpEntity<Customer> = HttpEntity(customer, headers)
        val response = restTemplate.postForEntity<CustomerDTO>("/API/customers", request, CustomerDTO::class.java)

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.OK, response.statusCode)
        Assertions.assertNotNull(response.body?.id)
        Assertions.assertEquals(customer.email, response.body?.email)
        Assertions.assertEquals(customer.name, response.body?.name)
        Assertions.assertEquals(customer.surname, response.body?.surname)
    }

    @Test
    fun `Create already existing customer`() {

        Customer().apply {
            email = "john.smith@example.com"
            name = "John"
            surname = "Smith"
        }.also { customerRepository.save(it) }

        val customer = Customer().apply {
            email = "john.smith@example.com"
            name = "John Jr."
            surname = "Smith"
        }

        // Make an HTTP POST request to /API/customers
        val headers : HttpHeaders = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_JSON
        }
        val request : HttpEntity<Customer> = HttpEntity(customer, headers)
        val response = restTemplate.postForEntity<String>("/API/customers", request, String::class.java)

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.CONFLICT, response.statusCode)
        Assertions.assertTrue(response.body?.contains("Customer with email ${customer.email} already exists") == true)
    }

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

    @Test
    fun `Update customer`() {
        val customer = Customer().apply {
            email = "john.smith@example.com"
            name = "John"
            surname = "Smith"
        }.also { customerRepository.save(it) }

        // Edit name, surname and email
        val editedCustomer = Customer().apply {
            name = "John Jr."
            surname = "Smiths"
            email = "john.jr.smiths@example.com"
        }

        // Make an HTTP POST request to /API/customers/{email}
        val headers : HttpHeaders = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_JSON
        }
        val request : HttpEntity<Customer> = HttpEntity(editedCustomer, headers)

        val response = restTemplate.exchange(
            "/API/customers/${customer.email}",
            HttpMethod.PUT,
            request,
            Customer::class.java
        )

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.OK, response.statusCode)
        Assertions.assertEquals(customer.id, response.body?.id)
        Assertions.assertEquals(editedCustomer.email, response.body?.email)
        Assertions.assertEquals(editedCustomer.name, response.body?.name)
        Assertions.assertEquals(editedCustomer.surname, response.body?.surname)
    }

    @Test
    fun `Update non existing customer`() {
        // Edit name, surname and email
        val editedCustomer = Customer().apply {
            name = "John Jr."
            surname = "Smiths"
            email = "barbara.smith@example.com"
        }

        // Make an HTTP POST request to /API/customers/{email}
        val headers : HttpHeaders = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_JSON
        }
        val request : HttpEntity<Customer> = HttpEntity(editedCustomer, headers)

        val response = restTemplate.exchange(
            "/API/customers/nonexistingemail@example.com",
            HttpMethod.PUT,
            request,
            String::class.java
        )

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertTrue(response.body?.contains("Customer with email nonexistingemail@example.com not found") == true)
    }
    @Test

    fun `Update customer to already existing email`() {
        val customer = Customer().apply {
            email = "john.smith@example.com"
            name = "John"
            surname = "Smith"
        }.also { customerRepository.save(it) }

        Customer().apply {
            email = "barbara.smith@example.com"
            name = "Barbara"
            surname = "Smith"
        }.also { customerRepository.save(it) }

        // Edit name, surname and email
        val editedCustomer = Customer().apply {
            name = "John Jr."
            surname = "Smiths"
            email = "barbara.smith@example.com"
        }

        // Make an HTTP POST request to /API/customers/{email}
        val headers : HttpHeaders = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_JSON
        }
        val request : HttpEntity<Customer> = HttpEntity(editedCustomer, headers)

        val response = restTemplate.exchange(
            "/API/customers/${customer.email}",
            HttpMethod.PUT,
            request,
            String::class.java
        )

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.CONFLICT, response.statusCode)
        assertTrue(response.body?.contains("Customer with email ${editedCustomer.email} already exists") == true)
    }

}


