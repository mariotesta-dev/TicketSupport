package it.polito.wa2.server.customers

import it.polito.wa2.server.tickets.TicketDTO
import it.polito.wa2.server.tickets.TicketRepository
import it.polito.wa2.server.tickets.toDTO
import org.springframework.stereotype.Service

@Service
class CustomerServiceImpl(private val customerRepository: CustomerRepository, private val ticketRepository: TicketRepository): CustomerService {
    override fun getCustomer(email: String): CustomerDTO {

        val response = customerRepository.findCustomerByEmail(email)
            ?: throw CustomerExceptions.CustomerNotFoundException("Customer with email $email not found")

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

        customerFound.name = customer.name
        customerFound.surname = customer.surname
        customerFound.email = customer.email
        return customerRepository.save(customerFound).toDTO()

    }
}