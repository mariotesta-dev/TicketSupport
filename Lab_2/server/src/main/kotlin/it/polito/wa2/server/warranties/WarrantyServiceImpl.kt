package it.polito.wa2.server.warranties

import org.springframework.stereotype.Service

@Service
class WarrantyServiceImpl(private val warrantyRepository: WarrantyRepository) : WarrantyService {

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
        // TODO Exceptions
        return warrantyRepository.save(warranty).toDTO()
    }

    override fun editWarranty(warrantyId: Long, warranty: Warranty): WarrantyDTO {
        // TODO Exceptions
        return warrantyRepository.save(warranty).toDTO()
    }

}