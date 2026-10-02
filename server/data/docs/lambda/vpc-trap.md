# Lambda dentro de una VPC

Para que una Lambda hable con una base de datos RDS en una subred privada debe ejecutarse dentro de la VPC. Una Lambda en subred privada no tiene salida a Internet salvo que exista un NAT Gateway, que es un componente de costo fijo por hora y por datos procesados. Para acceder a servicios de AWS (S3, DynamoDB) sin NAT se usan VPC endpoints. Esta es una causa frecuente de costos inesperados en proyectos pequeños.
