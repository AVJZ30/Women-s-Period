# Correos de Women's Period — Supabase Auth + Resend

Estas plantillas están listas para copiar en Supabase Authentication → Email Templates. No contienen claves privadas ni sustituyen la configuración SMTP.

| Evento Supabase | Archivo | Asunto recomendado |
|---|---|---|
| Confirm signup | confirmacion.html | Women's Period — Confirma tu correo |
| Reset password | recuperacion.html | Women's Period — Recupera tu contraseña |
| Magic Link / OTP | acceso.html | Women's Period — Código de acceso |
| Change email address | cambio-correo.html | Women's Period — Confirma tu nuevo correo |

Todas usan `{{ .Token }}`, tal como espera el formulario OTP existente de la aplicación. No reemplazar por valores fijos. Los correos incluyen un logo cargado de la carpeta favicon existente de la web.

## Activar Resend

1. Verifica un dominio que controles en Resend y configura los registros DNS indicados por Resend.
2. Crea en Resend una API key limitada al envío.
3. En Supabase (proyecto blood, ref `ijpvdezhakwflydbjchb`), abre Authentication → Email → SMTP Settings y configura SMTP personalizado:
   - Host: `smtp.resend.com`
   - Puerto: `465`
   - Usuario: `resend`
   - Contraseña: la clave API de Resend **solo en Supabase, jamás en GitHub o el HTML público**
   - Sender name: `Women's Period`
   - Sender email: una dirección de tu dominio verificado (p. ej. `no-reply@tu-dominio.com`)
4. En Authentication → Email Templates, pega los HTML según su tipo.
5. Revisa Authentication → URL Configuration para asegurar que el Site URL y redirect URLs incluyan `https://women-s-period.netlify.app/`.
6. Prueba crear una cuenta y recuperar la contraseña desde un correo de prueba; confirma recepción, código, caducidad y funcionamiento de ambos flujos.

Documentación: https://resend.com/docs/send-with-supabase-smtp y https://supabase.com/docs/guides/auth/auth-smtp

**Importante:** No deshabilites el proveedor SMTP existente hasta tener el dominio verificado, la clave privada configurada y una prueba exitosa. Los enlaces y el remitente deben permanecer bajo control del titular del dominio. Los servicios de correo pueden cachear o bloquear imágenes externas; el texto y código seguirán siendo legibles.
