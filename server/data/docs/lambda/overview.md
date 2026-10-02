# AWS Lambda

## Qué es
Servicio de cómputo serverless: subes una función y AWS la ejecuta cuando ocurre un evento (petición HTTP, archivo subido a S3, mensaje en una cola, cron). No administras servidores y pagas por invocación y tiempo de ejecución.

## Cuándo usarlo
- APIs con tráfico bajo o irregular, backends de proyectos pequeños, tareas programadas, procesamiento de eventos.
- Se integra de forma natural con API Gateway, S3, DynamoDB, SQS y EventBridge.

## Límites importantes
- Tiempo máximo de ejecución de 15 minutos por invocación.
- Arranques en frío (cold start): la primera invocación tras un periodo de inactividad es más lenta.
- Las conexiones a bases de datos relacionales (como PostgreSQL) se complican: cada instancia de la función abre su propia conexión. Se suele usar RDS Proxy.

## Alternativas
- EC2 o Lightsail: cuando el tráfico es constante y alto o necesitas un proceso siempre encendido.
- AWS Fargate / ECS: contenedores sin administrar servidores, para apps que no encajan en funciones.
- AWS App Runner: despliegue simple de un contenedor o repositorio web.
