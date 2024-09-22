package it.polito.wa2.server.observability

import io.micrometer.core.instrument.MeterRegistry
import io.micrometer.core.instrument.Tag
import io.micrometer.core.instrument.Timer
import io.prometheus.client.CollectorRegistry
import io.prometheus.client.Counter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import javax.annotation.PostConstruct

@Component
class ObservabilityUtils {

    @Autowired
    private lateinit var meterRegistry: MeterRegistry

    @PostConstruct
    fun init() {
        count("ticket_created_counter") {
            println("ticket_created_counter has been initialized!")
        }

        count("ticket_status_in_progress_counter") {
            println("ticket_status_in_progress_counter has been initialized!")
        }
        count("ticket_status_closed_counter") {
            println("ticket_status_closed_counter has been initialized!")
        }
        count("ticket_status_open_counter") {
            println("ticket_status_open_counter has been initialized!")
        }
        count("ticket_status_reopened_counter") {
            println("ticket_status_reopened_counter has been initialized!")
        }
        count("ticket_status_resolved_counter") {
            println("ticket_status_resolved_counter has been initialized!")
        }



    }

    fun <T> count(metricName: String, process: Timer.ResourceSample.() -> T): T =
        Timer.resource(meterRegistry, metricName)
            .use {
                println("${metricName} has been counted!")
                process(it)
            }

}
