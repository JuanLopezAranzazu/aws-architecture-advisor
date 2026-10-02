# Amazon API Gateway

## Qué es
Servicio administrado que expone APIs HTTP/REST/WebSocket a Internet. Recibe las peticiones, aplica autenticación, limitación de tasa (throttling) y las enruta a un backend, normalmente Lambda.

## Tipos
- HTTP API: más simple y económica, recomendada para la mayoría de APIs nuevas (soporta JWT authorizer).
- REST API: más funciones (claves de API, planes de uso, validación de peticiones, caché).
- WebSocket API: comunicación bidireccional en tiempo real.

## Cuándo usarlo
Cuando quieres una API pública con Lambda detrás, sin gestionar servidores ni balanceadores.

## Alternativas
- Lambda Function URLs: URL HTTPS directa a una función, sin funciones de gateway; sirve para casos muy simples.
- Application Load Balancer: para backends en EC2/ECS; tiene costo fijo por hora.
- AWS AppSync: si la API es GraphQL.
