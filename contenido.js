/* ============================================================
   CONTENIDO REAL DE ARMYNET — testimonios, clientes y fotos
   ------------------------------------------------------------
   REGLA: aqui va SOLO contenido real y verificable.
   Un testimonio inventado o una foto que no es tuya, en un sitio
   que vende ciberseguridad y auditoria, es el peor lugar posible
   para que te pillen. Si no tienes el dato, deja el arreglo vacio:
   la seccion NO se muestra y el sitio se ve completo igual.
   ============================================================ */


/* ---------- 1. TESTIMONIOS ---------------------------------
   Para agregar uno, copia el bloque de ejemplo comentado de abajo,
   pegalo dentro de los corchetes y completa los campos.

   texto     : lo que dijo el cliente, textual. No lo "mejores".
   autor     : nombre de quien lo dijo.
   cargo     : su cargo y empresa. Si no autoriza el nombre de la
               empresa, usa el rubro: "Jefe de Operaciones, empresa
               de logistica".
   servicio  : que trabajo se le hizo.
   fecha     : mes y ano, para que se note que es reciente.

   ANTES DE PUBLICAR: pidele autorizacion por escrito (un WhatsApp
   basta). Publicar el nombre y cargo de alguien sin permiso te
   expone, y ademas queda feo si el cliente se entera por terceros.
------------------------------------------------------------ */
window.ARMYNET_TESTIMONIOS = [

  // {
  //   texto: "Llegaron el mismo dia que los llamamos y dejaron el rack ordenado y rotulado. Ahora cualquiera del equipo entiende que va donde.",
  //   autor: "Nombre Apellido",
  //   cargo: "Jefe de Operaciones, Empresa S.A.",
  //   servicio: "Cableado estructurado Cat6",
  //   fecha: "Agosto 2026"
  // },

];


/* ---------- 2. CLIENTES ------------------------------------
   Logos de empresas para las que has trabajado.
   IMPORTANTE: usar el logo de un cliente en tu web requiere su
   autorizacion. Sin permiso escrito, no lo subas.

   nombre : nombre de la empresa (se usa como texto alternativo)
   logo   : archivo dentro de assets/clientes/ (PNG o SVG, fondo
            transparente, alto util ~40px)
------------------------------------------------------------ */
window.ARMYNET_CLIENTES = [

  // { nombre: "Empresa S.A.", logo: "assets/clientes/empresa.svg" },

];


/* ---------- 3. FOTOS DE PROYECTOS --------------------------
   Asocia fotos reales a las tarjetas de proyectos.html.
   La clave es el atributo data-proyecto de cada tarjeta.

   Deja las fotos en assets/proyectos/. Cuando me las pases las
   optimizo a WebP con respaldo JPG y les pongo las dimensiones
   correctas para que no salte el layout al cargar.
------------------------------------------------------------ */
window.ARMYNET_FOTOS = {

  // "red-corporativa": { src: "assets/proyectos/red-corporativa.webp", alt: "Rack rotulado con patch panels Cat6 certificados" },

};
