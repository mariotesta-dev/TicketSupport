package it.polito.wa2.server.experts

import it.polito.wa2.server.config.SecurityConfigurerInterface
import it.polito.wa2.server.config.SecurityRoles
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.stereotype.Component

@Component
class ExpertSecurityConfigurer : SecurityConfigurerInterface {

    override fun configure(http: HttpSecurity) {
        http.authorizeHttpRequests()
            .requestMatchers(javax.ws.rs.HttpMethod.GET, "/API/experts").hasRole(SecurityRoles.MANAGER)
            .requestMatchers(javax.ws.rs.HttpMethod.GET, "/API/experts/**")
            .hasAnyRole(SecurityRoles.MANAGER, SecurityRoles.EXPERT)
    }
}