package it.polito.wa2.server.warranties

import it.polito.wa2.server.products.Product
import it.polito.wa2.server.profiles.Profile
import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name="warranties")
class Warranty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "id", sequenceName = "warranties_id_seq", allocationSize = 1)
    var warrantyId: Long = 0

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_ean", referencedColumnName = "ean", nullable = false)
    var productEan: Product? = null

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = true)
    var customerId: Profile? = null

    // generate date of Purchase when the warranty is created (now)
    var dateOfPurchase: LocalDate = LocalDate.now()

    // generate end of warranty when the warranty is created (now + 2 years)
    var endOfWarranty: LocalDate = LocalDate.now().plusYears(2)

}