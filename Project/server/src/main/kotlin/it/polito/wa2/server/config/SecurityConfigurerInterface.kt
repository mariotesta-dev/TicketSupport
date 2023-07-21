package it.polito.wa2.server.config

import org.springframework.security.config.annotation.web.builders.HttpSecurity

interface SecurityConfigurerInterface {
    fun configure(http: HttpSecurity)
}
