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
        if(!warranty.endOfWarranty.isAfter(warranty.dateOfPurchase))
        {
            throw WarrantyExceptions.WarrantyInvalid("End of warranty has to be after date of purchase")
        }

        return warrantyRepository.save(warranty).toDTO()
    }

    override fun editWarranty(warrantyId: Long, warranty: Warranty): WarrantyDTO {

        val warrantyFound = warrantyRepository.getWarrantyById(warrantyId)
            ?: throw WarrantyExceptions.WarrantyNotFoundException("Warranty with id $warrantyId not found")

        if(!warranty.endOfWarranty.isAfter(warranty.dateOfPurchase))
        {
            throw WarrantyExceptions.WarrantyInvalid("End of warranty has to be after date of purchase")
        }

        warranty.id = warrantyFound.id;
        return warrantyRepository.save(warranty).toDTO()
    }

}