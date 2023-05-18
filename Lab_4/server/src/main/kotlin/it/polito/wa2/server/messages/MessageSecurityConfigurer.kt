package it.polito.wa2.server.messages

import it.polito.wa2.server.config.SecurityConfigurerInterface
import it.polito.wa2.server.config.SecurityRoles
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.stereotype.Component

@Component
class MessageSecurityConfigurer : SecurityConfigurerInterface {

    override fun configure(http: HttpSecurity) {
        http.authorizeHttpRequests()
            .requestMatchers(javax.ws.rs.HttpMethod.POST, "/API/messages/**").hasAnyRole(SecurityRoles.CUSTOMER, SecurityRoles.EXPERT)
    }
}