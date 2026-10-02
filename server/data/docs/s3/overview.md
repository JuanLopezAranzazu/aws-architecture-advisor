# Amazon S3

## Qué es
Almacenamiento de objetos (archivos) altamente duradero y escalable, organizado en buckets.

## Usos comunes
- Alojar sitios estáticos (React/Vite compilado: HTML, JS, CSS).
- Guardar archivos subidos por usuarios (imágenes, documentos), backups y datos para análisis.

## Buenas prácticas
- Mantener los buckets privados y bloquear el acceso público; exponer el sitio estático mediante CloudFront con Origin Access Control.
- Para subidas de usuarios, usar URLs prefirmadas para no pasar los archivos por tu backend.
- Activar versionado y cifrado en reposo.

## Alternativas
- AWS Amplify Hosting: despliegue de frontends con CI/CD integrado, más simple para principiantes.
- EFS o EBS: sistemas de archivos y discos para servidores, no para contenido web.
