# Amazon VPC y seguridad de red

## Qué es
Red virtual privada donde corren tus recursos. Se divide en subredes públicas (con ruta a Internet) y privadas (sin ella). Los security groups actúan como firewall por recurso.

## Patrón común
- Balanceador o recursos públicos en subredes públicas; base de datos y backend en subredes privadas.
- Los security groups permiten que la base de datos acepte conexiones solo desde el security group del backend.

## NAT Gateway
Permite que recursos en subredes privadas salgan a Internet. Tiene costo fijo por hora y por GB procesado, por lo que suele ser el componente más caro de arquitecturas pequeñas. Alternativas: VPC endpoints para servicios AWS, o evitar poner el recurso en subred privada si no es necesario.
