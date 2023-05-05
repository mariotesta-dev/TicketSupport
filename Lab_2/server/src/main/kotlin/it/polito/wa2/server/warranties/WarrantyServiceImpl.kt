package it.polito.wa2.server.warranties

import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.customers.CustomerExceptions
import it.polito.wa2.server.customers.CustomerRepository
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class WarrantyServiceImpl(private val warrantyRepository: WarrantyRepository, private val customerRepository: CustomerRepository) : WarrantyService {

    override fun getWarrantyById(warrantyId: Long): WarrantyDTO {
        val response = warrantyRepository.findById(warrantyId).orElse(null)
            ?: throw WarrantyExceptions.WarrantyNotFoundException("Warranty with id $warrantyId not found")

        return response.toDTO()
    }

    override fun getWarrantyByProduct(productEan: String): WarrantyDTO {
        val response = warrantyRepository.getWarrantyByProductEan(productEan)
            ?: throw WarrantyExceptions.WarrantyNotFoundException("Warranty for product $productEan not found")

        return response.toDTO()
    }

    override fun createWarranty(warranty: Warranty): WarrantyDTO {
        if(!warranty.endOfWarranty.isAfter(warranty.dateOfPurchase))
        {
            throw WarrantyExceptions.WarrantyInvalid("End of warranty has to be after date of purchase")
        }

        return warrantyRepository.save(warranty).toDTO()
    }

    override fun subscribeProduct(warrantyId: Long, customer: Customer): WarrantyDTO {
        val warrantyFound = warrantyRepository.getWarrantyById(warrantyId)
            ?: throw WarrantyExceptions.WarrantyNotFoundException("Warranty with id $warrantyId not found")

        customerRepository.findById(customer.id).orElse(null)
            ?: throw CustomerExceptions.CustomerNotFoundException("Customer with id ${customer.id} not found")

        warrantyFound.customer = customer
        return warrantyRepository.save(warrantyFound).toDTO()
    }

    override fun extendWarranty(warrantyId: Long, extension: WarrantyController.Extension): WarrantyDTO {
        val warrantyFound = warrantyRepository.getWarrantyById(warrantyId)
            ?: throw WarrantyExceptions.WarrantyNotFoundException("Warranty with id $warrantyId not found")

        if(!extension.newEndOfWarranty.isAfter(warrantyFound.endOfWarranty))
        {
            throw WarrantyExceptions.WarrantyInvalid("New end of warranty date has to be after current one")
        }

        warrantyFound.endOfWarranty = extension.newEndOfWarranty
        return warrantyRepository.save(warrantyFound).toDTO()
    }

}