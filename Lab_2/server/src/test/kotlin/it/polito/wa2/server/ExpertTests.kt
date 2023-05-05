package it.polito.wa2.server

import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.customers.CustomerRepository
import it.polito.wa2.server.experts.Expert
import it.polito.wa2.server.products.Product
import it.polito.wa2.server.experts.ExpertRepository
import it.polito.wa2.server.products.ProductRepository
import it.polito.wa2.server.tickets.Ticket
import it.polito.wa2.server.tickets.TicketRepository
import it.polito.wa2.server.tickets.ticketStatusHistories.*
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.test.annotation.DirtiesContext
import kotlin.reflect.full.createInstance

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ExpertTests : DbT1ApplicationTests() {

    @Autowired
    lateinit var expertRepository: ExpertRepository

    @Autowired
    lateinit var ticketStatusHistoryRepository: TicketStatusHistoryRepository

    @Autowired
    lateinit var ticketRepository: TicketRepository

    @Autowired
    lateinit var customerRepository: CustomerRepository

    @Autowired
    lateinit var productRepository: ProductRepository

    @Test
    fun `Get expert histories for evaluation`() {
        // Create a sample expert
        val sampleExpert = Expert().apply {
            name = "Sample expert"
            surname = "Sample surname"
            email = "sample.expert@example.com"
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

        val sampleTicket = Ticket::class.createInstance().apply {
            product = sampleProduct
            customer = sampleCustomer
            category = "INFORMATION"
            summary = "Office installation issue"
            description =
                "I am unable to install the software on my computer. It shows an error message during the installation process."
            assignedTo = sampleExpert
            priority = "HIGH"
        }.also { ticketRepository.save(it) }

        val ticketStatusHistory = TicketStatusHistory::class.createInstance().apply {
            ticket = sampleTicket
            status = TicketStatus.OPEN
        }.also { ticketStatusHistoryRepository.save(it) }

        val ticketStatusHistory2 = TicketStatusHistory::class.createInstance().apply {
            ticket = sampleTicket
            status = TicketStatus.IN_PROGRESS
        }.also { ticketStatusHistoryRepository.save(it) }

        // Make an HTTP GET request to /API/experts/{expertId}
        val response = restTemplate.exchange(
            "/API/experts/${sampleExpert.id}",
            HttpMethod.GET,
            null,
            object : ParameterizedTypeReference<List<TicketStatusHistoryDTOWithoutTicket>>() {}
        )

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.OK, response.statusCode)
        Assertions.assertEquals(ticketStatusHistory.status.name, response.body?.get(0)?.status?.name)
        Assertions.assertEquals(ticketStatusHistory2.status.name, response.body?.get(1)?.status?.name)
    }

    @Test
    fun `Get non-existing expert histories for evaluation`() {

        val nonExistingExpertId = -1

        // Make an HTTP GET request to /API/experts/{expertId}
        val response = restTemplate.getForEntity(
            "/API/experts/${nonExistingExpertId}",
            String::class.java
        )

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        Assertions.assertTrue(response.body?.contains("Expert with id $nonExistingExpertId not found") == true)
    }

}
