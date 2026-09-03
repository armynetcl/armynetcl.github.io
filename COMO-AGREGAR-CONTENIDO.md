# Cómo agregar contenido al sitio

Todo el contenido que cambia seguido vive en **dos archivos**, no en el HTML:

| Archivo | Qué controla |
|---|---|
| `posts.js` | artículos del blog |
| `contenido.js` | testimonios, logos de clientes, fotos de proyectos |

Abres el archivo con el Bloc de notas, copias un bloque de ejemplo, lo completas y guardas.
No hay que tocar HTML ni CSS.

---

## Regla que no se rompe

**Si el arreglo está vacío, la sección no aparece.** El sitio se ve completo igual.

Esto es a propósito: es preferible que no haya sección de testimonios a que haya una con
testimonios inventados. Vendes ciberseguridad y auditoría — un testimonio falso descubierto
no es un problema estético, es un problema de credibilidad justo en lo que cobras.

---

## Testimonios

En `contenido.js`, dentro de `ARMYNET_TESTIMONIOS`:

```js
{
  texto: "Lo que dijo el cliente, textual. No lo mejores ni lo redactes tú.",
  autor: "Nombre Apellido",
  cargo: "Jefe de Operaciones, Empresa S.A.",
  servicio: "Cableado estructurado Cat6",
  fecha: "Agosto 2026"
},
```

**Antes de publicar, pide autorización por escrito.** Un WhatsApp basta: *"¿Te parece si pongo
tu comentario en nuestra web con tu nombre y cargo?"* Publicar el nombre y el cargo de alguien
sin permiso te expone legalmente y queda pésimo si el cliente se entera por terceros.

Si no autoriza el nombre de la empresa, usa el rubro: *"Gerente TI, empresa de logística"*.
Sigue siendo verificable para ti y no expone al cliente.

---

## Fotos de proyectos

1. Deja las fotos en `assets/proyectos/`.
2. En `contenido.js`, dentro de `ARMYNET_FOTOS`, asocia cada foto a su tarjeta:

```js
"infraestructura-de-red": {
  src: "assets/proyectos/rack-rotulado.webp",
  alt: "Rack rotulado con patch panels Cat6 certificados"
},
```

Las claves disponibles (el `data-proyecto` de cada tarjeta en `proyectos.html`) son:

`infraestructura-de-red` · `consultoria-ti-para` · `auditoria-tecnologica-para` ·
`cctv-domotica-e` · `ciberseguridad-para-empresas` · `produccion-audiovisual-corporativa` ·
`renovacion-y-mantencion` · `sitio-web-corporativo`

**Una tarjeta sin foto se queda con su icono** — se ve intencional, no roto. No hay apuro
por llenarlas todas de una vez.

### Antes de subir fotos

- **Tapa lo que identifique al cliente**: rótulos con nombre de empresa, direcciones IP,
  credenciales pegadas en el rack, planos con dirección. Es tu obligación como proveedor TI.
- **Pide permiso** para mostrar la instalación de un cliente, aunque no se vea el nombre.
- **Pásamelas sin optimizar.** Yo las convierto a WebP con respaldo, les pongo dimensiones
  explícitas para que no salte el layout, y `loading="lazy"`. Una foto de celular sin
  optimizar pesa 4 MB y hunde la velocidad del sitio.

---

## Logos de clientes

En `ARMYNET_CLIENTES`, con el archivo en `assets/clientes/`:

```js
{ nombre: "Empresa S.A.", logo: "assets/clientes/empresa.svg" },
```

Usar el logo de un cliente en tu web **requiere su autorización**. Sin permiso escrito, no.
