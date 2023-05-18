package it.polito.wa2.server.customers

import jakarta.annotation.security.RolesAllowed
import org.springframework.security.core.Authentication
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.core.oidc.user.OidcUser
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.web.bind.annotation.*
import java.security.Principal


@RestController
class CustomerController(private val customerService: CustomerService) {

    //This must be accessible by who is authenticated
    @GetMapping("/API/customers/{email}")
    fun getCustomer(@PathVariable email: String) =
        customerService.getCustomer(email)

    //This must be publicly accessible (permitAll)
    /*@PostMapping("/API/customers")
    fun createCustomer(@RequestBody customer: Customer) =
        customerService.createCustomer(customer)*/

    //This must be accessible only by the customer
    @PutMapping("/API/customers/{email}")
    fun updateCustomer(@PathVariable email: String, @RequestBody customer: Customer) =
        customerService.updateCustomer(email, customer)
}