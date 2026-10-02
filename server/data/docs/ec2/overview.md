# Amazon EC2 y Lightsail

## EC2
Máquinas virtuales configurables. Útil cuando necesitas control total, procesos de larga duración o tráfico constante. Tú administras el sistema operativo, parches y escalado (con Auto Scaling y un balanceador).

## Lightsail
Servidores virtuales con precio mensual fijo y configuración simplificada (incluye IP estática, firewall y opcionalmente base de datos administrada). Muy adecuado para proyectos pequeños o educativos con presupuesto predecible.

## Cuándo elegirlos frente a serverless
- Tráfico constante y predecible, apps monolíticas existentes, o cuando el equipo prefiere un servidor tradicional.
- Presupuesto fijo y simple: Lightsail con Postgres en la misma instancia o base administrada.

## Alternativas
- Lambda + API Gateway para cargas esporádicas.
- ECS Fargate o App Runner para contenedores sin administrar servidores.
