# Amazon RDS (PostgreSQL)

## Qué es
Base de datos relacional administrada: AWS gestiona instalación, parches, backups y alta disponibilidad opcional (Multi-AZ). Soporta PostgreSQL, MySQL, MariaDB, Oracle y SQL Server.

## Cuándo usarlo
Datos relacionales con consultas SQL, transacciones y relaciones entre tablas (usuarios, pedidos, inscripciones).

## Consideraciones
- Corre sobre una instancia siempre encendida: se cobra por horas de instancia y almacenamiento aunque no haya tráfico. La capa gratuita de AWS cambió con el tiempo: verifica las condiciones vigentes.
- Debe colocarse en subredes privadas; solo accesible desde el backend mediante security groups.
- Con Lambda, las conexiones se agotan fácilmente: usar RDS Proxy.
- Multi-AZ mejora disponibilidad pero duplica el costo; innecesario para proyectos académicos.

## Alternativas
- Aurora Serverless v2 (PostgreSQL compatible): escala capacidad, pero tiene un mínimo de consumo.
- DynamoDB: si el modelo de datos es simple, orientado a claves y sin joins.
- PostgreSQL en una instancia EC2 o Lightsail: más barato y simple, pero tú administras backups y parches.
- Servicios externos de Postgres serverless si no se requiere que todo esté en AWS.
