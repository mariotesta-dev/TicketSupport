package it.polito.wa2.server.tickets.ticketStatusHistories

import it.polito.wa2.server.config.SecurityConfigurerInterface
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.stereotype.Component

@Component
class TicketStatusHistorySecurityConfigurer : SecurityConfigurerInterface {

    override fun configure(http: HttpSecurity) {
        http.authorizeHttpRequests()
            .requestMatchers(javax.ws.rs.HttpMethod.PUT, "/API/history/in_progress/**").hasRole("MANAGER")
            .requestMatchers(javax.ws.rs.HttpMethod.PUT, "/API/history/**").hasAnyRole("EXPERT","MANAGER")
    }
}