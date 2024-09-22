package it.polito.wa2.server.customers

import it.polito.wa2.server.auth.AuthExceptions
import it.polito.wa2.server.tickets.TicketDTO
import it.polito.wa2.server.tickets.TicketRepository
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryService
import it.polito.wa2.server.tickets.toDTO
import org.keycloak.admin.client.CreatedResponseUtil
import org.keycloak.admin.client.KeycloakBuilder
import org.springframework.stereotype.Service

@Service
class CustomerServiceImpl(private val customerRepository: CustomerRepository, private val ticketRepository: TicketRepository, private val ticketStatusHistoryService: TicketStatusHistoryService): CustomerService {
    override fun getCustomer(email: String): CustomerDTO {

        val response = customerRepository.findCustomerByEmail(email)
            ?: throw CustomerExceptions.CustomerNotFoundException("Customer with email $email not found")

        response.tickets.onEach {
            val status = ticketStatusHistoryService.getHistory(it.id).sortedByDescending {list -> list.updatedAt}[0]
            it.status = status.status
            it.lastUpdatedAt = status.updatedAt
        }

        return response.toDTO()
    }

    override fun getCustomerById(customerId: Long): CustomerDTO {

        val response = customerRepository.findById(customerId).orElse(null)
            ?: throw CustomerExceptions.CustomerNotFoundException("Customer with id $customerId not found")

        return response.toDTO()
    }

    override fun createCustomer(customer: Customer): CustomerDTO {
        val customerFound = customerRepository.findCustomerByEmail(customer.email)

        if(customerFound == null){
            customer.role = "customer" // Role is set server-side, not in the JSON!
            return customerRepository.save(customer).toDTO()
        } else {
            throw CustomerExceptions.CustomerAlreadyExistsException("Customer with email ${customer.email} already exists")
        }
    }

    override fun updateCustomer(email: String, customer: Customer): CustomerDTO {
        val customerFound = customerRepository.findCustomerByEmail(email)
            ?: throw CustomerExceptions.CustomerNotFoundException("Customer with email $email not found")

        if(email != customer.email){
            if(customerRepository.findCustomerByEmail(customer.email) != null){
                throw CustomerExceptions.CustomerAlreadyExistsException("Customer with email ${customer.email} already exists")
            }
        }

        updateCustomerKeyclock(email, customerFound, customer)

        customerFound.name = customer.name
        customerFound.surname = customer.surname
        customerFound.email = customer.email
        return customerRepository.save(customerFound).toDTO()

    }

    fun updateCustomerKeyclock(email: String, customer: Customer, newCustomer: Customer) {
        val kc = KeycloakBuilder.builder()
            .serverUrl("http://localhost:8080")
            .realm("master")
            .clientId("admin-cli")
            .username("admin")
            .password("admin")
            .build();

        try {
            val users = kc.realm("ticketing").users().search(null, null, null, customer.email, 0, 1,);
            val user = users[0]
            user.firstName = newCustomer.name
            user.lastName = newCustomer.surname
            user.email = newCustomer.email
            kc.realm("ticketing").users().get(user.id).update(user)
        } catch (e: Exception) {
            throw CustomerExceptions.CustomerKeyclockException(e.message!!)
        }
    }
}