package it.polito.wa2.server.warranties

import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.customers.CustomerExceptions
import it.polito.wa2.server.customers.CustomerRepository
import it.polito.wa2.server.products.ProductExceptions
import it.polito.wa2.server.products.ProductRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class WarrantyServiceImpl(private val warrantyRepository: WarrantyRepository, private val productRepository: ProductRepository, private val customerRepository: CustomerRepository) : WarrantyService {

    override fun getWarrantyByEan(ean: String): WarrantyDTOWithoutCustomer {

        val jwt = SecurityContextHolder.getContext().authentication as JwtAuthenticationToken
        val u = jwt.principal as Jwt

       /* "resource_access": {
            "ticketing": {
            "roles": ["customer" ]
        },*/

        val response = warrantyRepository.getWarrantyByProductEan(ean)
            ?: throw WarrantyExceptions.WarrantyNotFoundException("Warranty associated to ean $ean not found")

        if(u.getClaim<Map<String,Map<String,List<String>>>>("resource_access")["ticketing"]
                ?.get("roles")
                ?.contains("customer") == true) {

                if(response.customer?.email != u.getClaim<String>("email")) {
                    throw WarrantyExceptions.WarrantyNotOwned("You are not authorized to see this warranty")
                }
        }

        return response.toDTOWithoutCustomer()
    }

    override fun createWarranty(warranty: Warranty): WarrantyDTO {

        val response = productRepository.findById(warranty.product!!.ean).orElse(null)
            ?: throw ProductExceptions.ProductNotFoundException("Product with ean ${warranty.product?.ean} not found")

        if(!warranty.endOfWarranty.isAfter(warranty.dateOfPurchase))
        {
            throw WarrantyExceptions.WarrantyInvalid("End of warranty has to be after date of purchase")
        }

        return warrantyRepository.save(warranty).toDTO()
    }

    override fun subscribeProduct(warrantyId: Long, customer: Customer): WarrantyDTO {
        val warrantyFound = warrantyRepository.getWarrantyById(warrantyId)
            ?: throw WarrantyExceptions.WarrantyNotFoundException("Warranty with id $warrantyId not found")

        val customerFound = customerRepository.findById(customer.id).orElse(null)
            ?: throw CustomerExceptions.CustomerNotFoundException("Customer with id ${customer.id} not found")

        warrantyFound.customer = customerFound
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