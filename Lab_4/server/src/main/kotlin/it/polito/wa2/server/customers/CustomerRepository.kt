package it.polito.wa2.server.customers

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CustomerRepository: JpaRepository<Customer, Long> {
    fun findCustomerByEmail(email: String): Customer?
}