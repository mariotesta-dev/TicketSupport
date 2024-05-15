
# HELP

This file contains some notes and tips useful to understand observability.

Here's the guide provided by the professor: [Here](https://medium.com/spring-boot/spring-boot-3-observability-monitor-application-on-the-method-level-8057abec5926)

---

## Setup

We are running 3 services that provide data:

- Logs with Loki
- Traces with Tempo
- Metrics with Prometheus

And 1 service to gather those data and access them:

- Grafana

### Compose

`observe-docker-compose.yaml`

For now those services startup have been configured in a separate docker compose yaml file.
This is just to separate until we are trying to understand, than the content could be merged with the main compose file.

There is an instruction in the makefile to run it.

### Configuration

A `docker` folder has been added inside `server`.

Within that folder there are others subfolders:
- grafana
  - provisioning
    -  dashboards
    -  datasources
- loki
- prometheus
- tempo

Each of them contains configurations that for now have been taken from the article and pasted here.

The article wasn't really detailed on them, soo I took part of the configuration from the Github repo that the article was referring to.

GitHub repo: [Here](https://github.com/NoahHsu/event-sourcing-order-poc)

#### Grafana

Inside the `grafana/provisioning/dashboards` folder there is: 
- Configuration which is the `dashboard.yaml` file.
- Example dashboard, the `log_traces_metrics.json` file.

This last one is imported into Grafana and can be visualized [Here](http://localhost:3000/d/dLsDQIUnzb/spring-boot-observability) once the services are running.

---

## Implementation

For now the only actual implementations have been:

- Adding inside `resources` an `application.yaml` file, maybe it could be merged with `application.properties`
- Adding inside `resources` a `logback-spring.xml` file, which I did't understand the purpose, but was part of the guide.
- Adding the `actuator/prometheus` enpoint to the filters to completely whitelist it. Maybe It would better to implement a proper check, but for now I just removed every check from it. This endpoint is not implement by us, but it's exposed by Prometheus dependencies in the server and its purpose is to allow Prometheus to read the metrics.
- Adding a kotlin file `observability/configuration.kt` 
- Implementing observability over `AuthController` and a log into the `/auth/login` endpoint. If requests are performed to this endpoint, data can be seen updated on the Grafana dashboard.
