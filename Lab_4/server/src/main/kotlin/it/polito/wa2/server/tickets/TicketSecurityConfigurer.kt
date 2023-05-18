package it.polito.wa2.server.tickets

import it.polito.wa2.server.config.SecurityConfigurerInterface
import it.polito.wa2.server.config.SecurityRoles
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.stereotype.Component

@Component
class TicketSecurityConfigurer : SecurityConfigurerInterface {

    override fun configure(http: HttpSecurity) {
        http.authorizeHttpRequests()
            .requestMatchers(javax.ws.rs.HttpMethod.GET, "/API/tickets/*/messages").hasAnyRole(SecurityRoles.CUSTOMER, SecurityRoles.EXPERT)
            .requestMatchers(javax.ws.rs.HttpMethod.POST, "/API/tickets").hasRole(SecurityRoles.CUSTOMER)
            .requestMatchers(javax.ws.rs.HttpMethod.GET, "/API/tickets/**").hasRole(SecurityRoles.MANAGER)
            .requestMatchers(javax.ws.rs.HttpMethod.PUT, "/API/tickets/*/expert").hasRole(SecurityRoles.MANAGER)
    }
}