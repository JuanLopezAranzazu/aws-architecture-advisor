# Amazon CloudFront

## Qué es
Red de distribución de contenido (CDN) que sirve tu contenido desde ubicaciones cercanas al usuario, con HTTPS y certificados gratuitos de ACM.

## Cuándo usarlo
- Delante de un bucket S3 con un sitio estático: reduce latencia, permite HTTPS y evita exponer el bucket.
- En una SPA (React) hay que configurar que los errores 403/404 devuelvan index.html para que funcione el enrutado del cliente.

## Alternativas
- AWS Amplify Hosting (incluye CDN).
- Servir directamente desde S3 con website hosting: solo HTTP y menos seguro; no recomendado.
