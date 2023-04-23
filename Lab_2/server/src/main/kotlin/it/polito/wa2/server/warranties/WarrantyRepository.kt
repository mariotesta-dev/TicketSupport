package it.polito.wa2.server.warranties

import it.polito.wa2.server.profiles.Profile
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface WarrantyRepository : JpaRepository<Warranty, Long> {

    fun getWarrantiesByCustomer(customer: Long): List<Warranty>
}