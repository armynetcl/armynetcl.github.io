// ============================================================
// ARTÍCULOS DEL BLOG DE ARMYNET
// Para agregar un artículo nuevo: copia un bloque { ... } completo,
// pégalo al INICIO del array (así aparece primero) y edita sus campos.
// id: identificador único, sin espacios, se usa como ancla (#id)
// tag: categoría corta (aparece como chip de color)
// icon: clase de Font Awesome (fa-solid), ver https://fontawesome.com/icons
// title: título del artículo
// paragraphs: arreglo de párrafos en HTML simple (puedes usar <strong>, <br>)
// ctaText / ctaHref: botón al final del artículo
// ============================================================
window.ARMYNET_POSTS = [
  {
    id: "cat6-vs-cat6a",
    tag: "Redes",
    icon: "fa-network-wired",
    title: "Cableado Cat6 vs Cat6a: ¿cuál elegir para tu oficina?",
    paragraphs: [
      "Si estás renovando la red de tu oficina o local, es común dudar entre Cat6 y Cat6a. Ambos soportan Gigabit Ethernet sin problema, pero la diferencia está en la proyección a futuro: Cat6a certifica hasta 10 Gbps en distancias de 100 metros, mientras que Cat6 limita esa velocidad a unos 55 metros antes de degradarse.",
      "Para una oficina pequeña con navegación web, correo y videollamadas, Cat6 suele ser suficiente y más económico. Si en cambio manejas servidores locales, respaldos pesados, edición de video o planeas escalar el negocio en los próximos años, Cat6a evita tener que recablear más adelante — el cable es más grueso y algo más caro de instalar, pero la inversión se amortiza en durabilidad.",
      "Un punto que solemos revisar en terreno: no sirve de nada un cable Cat6a si el switch, los patch panels o los conectores son de categoría inferior — toda la ruta debe certificarse al mismo estándar para lograr el rendimiento prometido."
    ],
    ctaText: "Cotiza tu cableado estructurado",
    ctaHref: "contacto.html"
  },
  {
    id: "backup-pyme",
    tag: "Consultoría TI",
    icon: "fa-server",
    title: "5 señales de que tu PYME necesita un respaldo (backup) automático",
    paragraphs: [
      "Muchas PYMEs descubren que necesitaban un backup justo después de perder información importante. Estas son señales de que conviene adelantarse:",
      "<strong>1. Guardas todo en un solo disco o notebook.</strong> Si ese equipo falla, se pierde o lo roban, no hay copia de respaldo.<br><strong>2. Nadie sabe con certeza dónde están los archivos críticos.</strong> Contratos, boletas, bases de clientes dispersos entre correos y carpetas.<br><strong>3. Ya tuviste un \"susto\" de ransomware o virus.</strong> Sin backup limpio, pagar el rescate suele ser la única opción — y no garantiza nada.<br><strong>4. Tu equipo trabaja con archivos compartidos sin control de versiones.</strong> Un error de un colaborador puede sobrescribir información de todos.<br><strong>5. No has probado restaurar un respaldo nunca.</strong> Un backup que nunca se probó no es un backup confiable.",
      "La regla básica de respaldo (conocida como 3-2-1) es simple: al menos 3 copias de tus datos, en 2 medios distintos, con 1 copia fuera del lugar físico del negocio. Implementarla no requiere una inversión enorme, pero sí planificación técnica."
    ],
    ctaText: "Evalúa tu backup sin costo",
    ctaHref: "contacto.html"
  },
  {
    id: "que-es-pentesting",
    tag: "Ciberseguridad",
    icon: "fa-shield-halved",
    title: "¿Qué es el pentesting y por qué toda empresa debería considerarlo?",
    paragraphs: [
      "El pentesting (prueba de penetración) es un ataque controlado y autorizado a tus propios sistemas, con el objetivo de encontrar vulnerabilidades antes de que lo haga alguien con malas intenciones. A diferencia de un antivirus o un firewall, que reaccionan ante amenazas conocidas, el pentesting simula el comportamiento real de un atacante para descubrir fallas que ninguna herramienta automática detecta por sí sola.",
      "El proceso generalmente cubre tres frentes: la red (routers, switches, firewall, Wi-Fi), las aplicaciones y sitios web expuestos a internet, y el factor humano mediante pruebas de phishing controladas. Al final se entrega un informe con cada hallazgo, su nivel de riesgo y recomendaciones concretas para corregirlo — no solo una lista de problemas, sino un plan de acción priorizado.",
      "No es solo para grandes corporaciones: una PYME que maneja datos de clientes, pagos o información sensible es igual de atractiva para un atacante, muchas veces porque tiene menos defensas. Una evaluación periódica es una de las inversiones en seguridad con mejor relación costo-beneficio."
    ],
    ctaText: "Solicita una evaluación",
    ctaHref: "contacto.html"
  }
];
