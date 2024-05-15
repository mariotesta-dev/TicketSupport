package it.polito.wa2.server.customers

import it.polito.wa2.server.config.SecurityConfigurerInterface
import it.polito.wa2.server.config.SecurityRoles
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.stereotype.Component

@Component
class CustomerSecurityConfigurer : SecurityConfigurerInterface {

    override fun configure(http: HttpSecurity) {
        http.authorizeHttpRequests()
            .requestMatchers(HttpMethod.PUT,"/API/customers/**").hasRole(SecurityRoles.CUSTOMER)
    }
}