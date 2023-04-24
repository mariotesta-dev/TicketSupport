package it.polito.wa2.server.warranties

import org.springframework.stereotype.Service

@Service
class WarrantyServiceImpl(private val warrantyRepository: WarrantyRepository) : WarrantyService {
    override fun getAll(): List<WarrantyDTO> {
        return warrantyRepository.findAll().map{ it.toDTO() }
    }

    override fun getAllWarrantiesByCustomer(customer: Long): List<WarrantyDTO> {
        return warrantyRepository.getWarrantiesByCustomerId(customer).map{ it.toDTO() }
    }

    override fun getWarranty(warrantyId: Long): WarrantyDTO {
        val response = warrantyRepository.findById(warrantyId).orElse(null)
            ?: throw WarrantyExceptions.WarrantyNotFoundException("Warranty with id $warrantyId not found")

        return response.toDTO()

    }

}