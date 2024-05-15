package it.polito.wa2.server.products

import it.polito.wa2.server.config.SecurityConfigurerInterface
import it.polito.wa2.server.config.SecurityRoles
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.stereotype.Component

@Component
class ProductSecurityConfigurer : SecurityConfigurerInterface {

    override fun configure(http: HttpSecurity) {
        http.authorizeHttpRequests()
            .requestMatchers(HttpMethod.GET,"/API/products").hasAnyRole(SecurityRoles.MANAGER, SecurityRoles.EXPERT)
            .requestMatchers(HttpMethod.GET,"/API/products/**").hasAnyRole(SecurityRoles.CUSTOMER, SecurityRoles.MANAGER, SecurityRoles.EXPERT)
            .requestMatchers(HttpMethod.POST,"/API/products").hasAnyRole(SecurityRoles.MANAGER)

    }
}