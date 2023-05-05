package it.polito.wa2.server

import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.products.Product
import it.polito.wa2.server.products.ProductRepository
import it.polito.wa2.server.tickets.TicketRepository
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import it.polito.wa2.server.customers.CustomerRepository
import it.polito.wa2.server.experts.Expert
import it.polito.wa2.server.experts.ExpertRepository
import it.polito.wa2.server.tickets.Ticket
import it.polito.wa2.server.tickets.TicketController
import it.polito.wa2.server.tickets.TicketDTO
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
import org.springframework.test.annotation.DirtiesContext
import kotlin.reflect.full.createInstance

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class TicketTests : DbT1ApplicationTests() {

    @Autowired
    lateinit var ticketRepository: TicketRepository

    @Autowired
    lateinit var productRepository: ProductRepository

    @Autowired
    lateinit var customerRepository: CustomerRepository

    @Autowired
    lateinit var expertRepository: ExpertRepository

    @Test
    fun `Get ticket by id`() {
        // Create a sample customer
        val sampleCustomer = Customer().apply {
            email = "john.smith@example.com"
            name = "John"
            surname = "Smith"
        }
        customerRepository.save(sampleCustomer)

        // Create a sample product
        val sampleProduct = Product().apply {
            ean = "3286341298116"
            name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
            brand = "Bridgestone"
        }
        productRepository.save(sampleProduct)

        // Create a sample ticket
        val ticket = Ticket().apply {
            product = sampleProduct
            customer = sampleCustomer
            category = "INFORMATION"
            summary = "Office installation issue"
            description =
                "I am unable to install the software on my computer. It shows an error message during the installation process."
        }

        ticketRepository.save(ticket)

        // Make an HTTP GET request to /API/tickets/{id}
        val response = restTemplate.getForEntity<TicketDTO>("/API/tickets/${ticket.id}", TicketDTO::class.java)

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.OK, response.statusCode)
        Assertions.assertEquals(ticket.id, response.body?.id)
        Assertions.assertEquals(ticket.product.ean, response.body?.product?.ean)
        Assertions.assertEquals(ticket.customer?.id, response.body?.customer?.id)
        Assertions.assertEquals(ticket.category, response.body?.category)
        Assertions.assertEquals(ticket.summary, response.body?.summary)
        Assertions.assertEquals(ticket.description, response.body?.description)
        Assertions.assertEquals(ticket.assignedTo, response.body?.assignedTo)
        Assertions.assertEquals(ticket.priority, response.body?.priority)
    }

    @Test
    fun `Get non-existent ticket by id`() {
        // Non-existent id
        val nonExistentId = "-1"

        // Make an HTTP GET request to /API/tickets/{id}
        val response = restTemplate.getForEntity<String>("/API/tickets/${nonExistentId}", String::class.java)

        // Verify the response status and content
        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertTrue(response.body?.contains("Ticket with id $nonExistentId not found") == true)
    }

    @Test
    fun `Create ticket`() {
        // Create a sample customer
        val sampleCustomer = Customer().apply {
            email = "john.smith@example.com"
            name = "John"
            surname = "Smith"
        }.also { customerRepository.save(it) }

        // Create a sample product
        val sampleProduct = Product().apply {
            ean = "3286341298116"
            name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
            brand = "Bridgestone"
        }.also { productRepository.save(it) }


        // Create a sample ticket
        val ticket = Ticket::class.createInstance().apply {
            product = sampleProduct
            customer = sampleCustomer
            category = "INFORMATION"
            summary = "Office installation issue"
            description =
                "I am unable to install the software on my computer. It shows an error message during the installation process."
        }

        // Make an HTTP POST request to /API/tickets
        val headers : HttpHeaders = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_JSON
        }
        val request : HttpEntity<Ticket> = HttpEntity(ticket, headers)
        val response = restTemplate.postForEntity<TicketDTO>("/API/tickets", request, TicketDTO::class.java)

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.OK, response.statusCode)
        Assertions.assertNotNull(response.body?.id)
        Assertions.assertEquals(ticket.product.ean, response.body?.product?.ean)
        Assertions.assertEquals(ticket.customer?.id, response.body?.customer?.id)
        Assertions.assertEquals(ticket.category, response.body?.category)
        Assertions.assertEquals(ticket.summary, response.body?.summary)
        Assertions.assertEquals(ticket.description, response.body?.description)
        Assertions.assertEquals(null, response.body?.assignedTo)
        Assertions.assertEquals("", response.body?.priority)
        Assertions.assertEquals("OPEN", response.body?.history?.status?.name)
    }

    @Test
    fun `Create ticket with invalid customer`() {
        // Create a sample customer (but it's NOT in the database, so it's invalid and breaks the ticket creation)
        val sampleCustomer = Customer().apply {
            email = "john.smith@example.com"
            name = "John"
            surname = "Smith"
        }

        // Create a sample product
        val sampleProduct = Product().apply {
            ean = "3286341298116"
            name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
            brand = "Bridgestone"
        }.also { productRepository.save(it) }


        // Create a sample ticket
        val ticket = Ticket::class.createInstance().apply {
            product = sampleProduct
            customer = sampleCustomer
            category = "INFORMATION"
            summary = "Office installation issue"
            description =
                "I am unable to install the software on my computer. It shows an error message during the installation process."
        }

        // Make an HTTP POST request to /API/tickets
        val headers : HttpHeaders = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_JSON
        }
        val request : HttpEntity<Ticket> = HttpEntity(ticket, headers)
        val response = restTemplate.postForEntity<String>("/API/tickets", request, String::class.java)

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        Assertions.assertTrue(response.body?.contains("Customer with id ${sampleCustomer.id} not found") == true)
    }

    @Test
    fun `Create ticket with invalid product`() {
        // Create a sample customer
        val sampleCustomer = Customer().apply {
            email = "john.smith@example.com"
            name = "John"
            surname = "Smith"
        }.also { customerRepository.save(it) }

        // Create a sample product (but it's NOT in the database, so it's invalid and breaks the ticket creation)
        val sampleProduct = Product().apply {
            ean = "3286341298116"
            name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
            brand = "Bridgestone"
        }


        // Create a sample ticket
        val ticket = Ticket::class.createInstance().apply {
            product = sampleProduct
            customer = sampleCustomer
            category = "INFORMATION"
            summary = "Office installation issue"
            description =
                "I am unable to install the software on my computer. It shows an error message during the installation process."
        }

        // Make an HTTP POST request to /API/tickets
        val headers : HttpHeaders = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_JSON
        }
        val request : HttpEntity<Ticket> = HttpEntity(ticket, headers)
        val response = restTemplate.postForEntity<String>("/API/tickets", request, String::class.java)

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        Assertions.assertTrue(response.body?.contains("Product with ean ${sampleProduct.ean} not found") == true)
    }

    @Test
    fun `Assign to expert`() {

        var sampleExpert = Expert().apply {
            email = "salvatore.aranzulla@example.com"
            name = "Salvatore"
            surname = "Aranzulla"
        }
        expertRepository.save(sampleExpert)

        var sampleCustomer = Customer().apply {
            email = "gigio.riva@example.com"
            name = "Gigio"
            surname = "Riva"
        }
        customerRepository.save(sampleCustomer)

        val sampleProduct = Product().apply {
            ean = "3286341298116"
            name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
            brand = "Bridgestone"
        }
        productRepository.save(sampleProduct)

        val ticket = Ticket::class.createInstance().apply {
            product = sampleProduct
            customer = sampleCustomer
            category = "INFORMATION"
            summary = "Office installation issue"
            description =
                "I am unable to install the software on my computer. It shows an error message during the installation process."
        }.also { ticketRepository.save(it) }


        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON

        val assignment = TicketController.Assignment(priority = "HIGH", expert = sampleExpert)

        val response = restTemplate.exchange(
            "/API/tickets/${ticket.id}/expert",
            HttpMethod.PUT,
            HttpEntity(assignment, headers),
            TicketDTO::class.java
        )

        Assertions.assertEquals(HttpStatus.OK, response.statusCode)
        Assertions.assertEquals("IN_PROGRESS", response.body?.history?.status?.name)
    }

    @Test
    fun `Assign to non existing expert`() {

        var sampleExpert = Expert().apply {
            id = -1
            email = "salvatore.aranzulla@example.com"
            name = "Salvatore"
            surname = "Aranzulla"
        }

        var sampleCustomer = Customer().apply {
            email = "gigio.riva@example.com"
            name = "Gigio"
            surname = "Riva"
        }
        customerRepository.save(sampleCustomer)

        val sampleProduct = Product().apply {
            ean = "3286341298116"
            name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
            brand = "Bridgestone"
        }
        productRepository.save(sampleProduct)

        val ticket = Ticket::class.createInstance().apply {
            product = sampleProduct
            customer = sampleCustomer
            category = "INFORMATION"
            summary = "Office installation issue"
            description =
                "I am unable to install the software on my computer. It shows an error message during the installation process."
        }.also { ticketRepository.save(it) }


        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON

        val assignment = TicketController.Assignment(priority = "HIGH", expert = sampleExpert)

        val response = restTemplate.exchange(
            "/API/tickets/${ticket.id}/expert",
            HttpMethod.PUT,
            HttpEntity(assignment, headers),
            String::class.java
        )

        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        Assertions.assertTrue(response.body?.contains("Expert with id ${sampleExpert.id} not found") == true)
    }

    @Test
    fun `Assign expert to non existing ticket`() {

        var sampleExpert = Expert().apply {
            email = "salvatore.aranzulla@example.com"
            name = "Salvatore"
            surname = "Aranzulla"
        }.also { expertRepository.save(it) }


        var sampleCustomer = Customer().apply {
            email = "gigio.riva@example.com"
            name = "Gigio"
            surname = "Riva"
        }
        customerRepository.save(sampleCustomer)

        val sampleProduct = Product().apply {
            ean = "3286341298116"
            name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
            brand = "Bridgestone"
        }
        productRepository.save(sampleProduct)

        val ticket = Ticket::class.createInstance().apply {
            product = sampleProduct
            customer = sampleCustomer
            category = "INFORMATION"
            summary = "Office installation issue"
            description =
                "I am unable to install the software on my computer. It shows an error message during the installation process."
        }.also { ticketRepository.save(it) }

        // Invalid ID for ticket
        val nonExistingId = -1


        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON

        val assignment = TicketController.Assignment(priority = "HIGH", expert = sampleExpert)

        val response = restTemplate.exchange(
            "/API/tickets/${nonExistingId}/expert",
            HttpMethod.PUT,
            HttpEntity(assignment, headers),
            String::class.java
        )

        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        Assertions.assertTrue(response.body?.contains("Ticket with id $nonExistingId not found") == true)
    }

}
