# Amazon DynamoDB

## Qué es
Base de datos NoSQL clave-valor y de documentos, completamente serverless, con latencia de milisegundos. Modo bajo demanda: pagas por lectura y escritura, sin servidores ni conexiones que gestionar.

## Cuándo usarlo
- Patrones de acceso conocidos de antemano (buscar por id, listar por usuario).
- Backends con Lambda: no hay problemas de conexiones y escala a cero.

## Cuándo no
- Consultas ad hoc, reportes, joins o relaciones complejas: el diseño de tablas (claves de partición/orden, índices secundarios) es más difícil que en SQL.

## Alternativas
- RDS/Aurora PostgreSQL para datos relacionales.
- DocumentDB para compatibilidad con MongoDB.
