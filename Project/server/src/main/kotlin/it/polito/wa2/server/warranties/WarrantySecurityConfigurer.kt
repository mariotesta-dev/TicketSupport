package it.polito.wa2.server.warranties

import it.polito.wa2.server.config.SecurityConfigurerInterface
import it.polito.wa2.server.config.SecurityRoles
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.stereotype.Component

@Component
class WarrantySecurityConfigurer : SecurityConfigurerInterface {

    override fun configure(http: HttpSecurity) {
        http.authorizeHttpRequests()
            .requestMatchers(javax.ws.rs.HttpMethod.POST, "/API/warranties/**").hasRole(SecurityRoles.CUSTOMER)
            .requestMatchers(javax.ws.rs.HttpMethod.PUT, "/API/warranties/*/extend").hasRole(SecurityRoles.EXPERT)
            .requestMatchers(javax.ws.rs.HttpMethod.PUT, "/API/warranties/*/subscribe").hasRole(SecurityRoles.CUSTOMER) // subscribeProduct
    }
}