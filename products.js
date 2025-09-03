// Datos de productos con información detallada
const products = [
    {
        id: 1,
        name: "Apple Music",
        image: "https://jcstream.com/wp-content/uploads/2025/08/music-533x800.png",
        price: "4,50$",
        rating: 0,
        category: "streaming",
        hasVariants: true,
        description: "Accede a millones de canciones sin anuncios con Apple Music.",
        features: [
            "Música sin anuncios",
            "Descargas offline",
            "Audio de alta calidad",
            "Acceso a exclusivos"
        ]
    },
    {
        id: 2,
        name: "Apple TV",
        image: "https://jcstream.com/wp-content/uploads/2025/08/tv-533x800.png",
        price: "4,00$",
        rating: 0,
        category: "streaming",
        hasVariants: true,
        description: "Disfruta de contenido original y películas en Apple TV+.",
        features: [
            "Contenido original",
            "4K HDR disponible",
            "Sin anuncios",
            "Múltiples dispositivos"
        ]
    },
    {
        id: 3,
        name: "Canva Pro",
        image: "https://jcstream.com/wp-content/uploads/2025/02/canva-533x800.png",
        price: "0,90$ - 45,00$",
        priceRange: "desde 0,90$ hasta 45,00$",
        rating: 0,
        category: "apps",
        hasVariants: true,
        description: "Herramienta de diseño profesional con plantillas premium y elementos exclusivos.",
        features: [
            "Plantillas premium",
            "Elementos de diseño exclusivos",
            "Colaboración en equipo",
            "Exportación en alta calidad"
        ],
        variants: [
            { duration: "1 mes", price: "$4.000" },
            { duration: "3 meses", price: "$9.000" },
            { duration: "6 meses", price: "$16.000" },
            { duration: "12 meses", price: "$30.000" }
        ]
    },
    {
        id: 4,
        name: "CapCut",
        image: "https://jcstream.com/wp-content/uploads/2025/08/capcut-533x800.png",
        price: "7,00$ - 15,00$",
        priceRange: "desde 7,00$ hasta 15,00$",
        rating: 0,
        category: "apps",
        hasVariants: true,
        description: "Editor de video profesional con efectos avanzados y herramientas de IA.",
        features: [
            "Efectos premium",
            "Herramientas de IA",
            "Exportación sin marca de agua",
            "Plantillas profesionales"
        ]
    },
    {
        id: 5,
        name: "ChatGPT",
        image: "https://jcstream.com/wp-content/uploads/2025/08/chatgpt-533x800.png",
        price: "3,00$ - 30,00$",
        priceRange: "desde 3,00$ hasta 30,00$",
        rating: 0,
        category: "apps",
        hasVariants: true,
        description: "ChatGPT Plus Oficial - Acceso prioritario y funciones avanzadas de IA.",
        features: [
            "Acceso prioritario",
            "Respuestas más rápidas",
            "Funciones avanzadas",
            "1 dispositivo por 30 días"
        ],
        variants: [
            { screens: "1 dispositivo", duration: "30 días", price: "$10.000" }
        ]
    },
    {
        id: 6,
        name: "Crunchyroll",
        image: "https://jcstream.com/wp-content/uploads/2025/02/Crunchyroll-533x800.png",
        price: "0,80$ - 5,50$",
        priceRange: "desde 0,80$ hasta 5,50$",
        rating: 0,
        category: "streaming",
        hasVariants: true,
        description: "🎌 Crunchyroll Megafan - La mejor experiencia de anime sin anuncios.",
        features: [
            "Anime sin anuncios",
            "Simulcast exclusivo",
            "Manga premium",
            "Descuentas en tienda"
        ],
        variants: [
            { screens: "1", renewal: "$4.500", noRenewal: "$5.000" }
        ]
    },
    {
        id: 7,
        name: "Disney Premium",
        image: "https://jcstream.com/wp-content/uploads/2025/02/aacf6586b396ee6922d0f5912d13c879-1-533x800.png",
        price: "1,50$ - 6,00$",
        priceRange: "desde 1,50$ hasta 6,00$",
        rating: 0,
        category: "streaming",
        hasVariants: true,
        description: "🏰 Disney+ ESPN - Todo el contenido de Disney, Marvel, Star Wars y deportes ESPN.",
        features: [
            "Contenido Disney completo",
            "Marvel y Star Wars",
            "ESPN deportes",
            "4K disponible"
        ],
        variants: [
            { screens: "1", renewal: "$5.000", noRenewal: "$6.500" }
        ]
    },
    {
        id: 8,
        name: "ExpressVPN",
        image: "https://jcstream.com/wp-content/uploads/2025/08/expressvpn-533x800.png",
        price: "3,00$",
        rating: 0,
        category: "vpn",
        hasVariants: false,
        description: "VPN premium con servidores en todo el mundo y máxima seguridad.",
        features: [
            "Servidores globales",
            "Velocidad ultra rápida",
            "Cifrado militar",
            "Sin logs de actividad"
        ]
    },
    {
        id: 9,
        name: "HolaVPN",
        image: "https://jcstream.com/wp-content/uploads/2025/08/holavpn-533x800.png",
        price: "3,00$",
        rating: 0,
        category: "vpn",
        hasVariants: false,
        description: "VPN fácil de usar con acceso global a contenido restringido.",
        features: [
            "Fácil configuración",
            "Acceso global",
            "Múltiples dispositivos",
            "Navegación segura"
        ]
    },
    {
        id: 10,
        name: "IpVanish Premium",
        image: "https://jcstream.com/wp-content/uploads/2025/08/ipvanish-533x800.png",
        price: "11,00$",
        rating: 0,
        category: "vpn",
        hasVariants: false,
        description: "VPN premium con conexiones ilimitadas y servidores optimizados.",
        features: [
            "Conexiones ilimitadas",
            "Servidores optimizados",
            "Kill switch automático",
            "Soporte 24/7"
        ]
    },
    {
        id: 11,
        name: "Jellyfin",
        image: "https://jcstream.com/wp-content/uploads/2025/08/jellyfin-533x800.png",
        price: "3,00$ - 5,00$",
        priceRange: "desde 3,00$ hasta 5,00$",
        rating: 0,
        category: "streaming",
        hasVariants: true,
        description: "Servidor multimedia personal para organizar y transmitir tu contenido.",
        features: [
            "Servidor personal",
            "Sin límites",
            "Múltiples formatos",
            "Acceso remoto"
        ]
    },
    {
        id: 12,
        name: "Max",
        image: "https://jcstream.com/wp-content/uploads/2025/02/max-533x800.png",
        price: "1,00$ - 3,50$",
        priceRange: "desde 1,00$ hasta 3,50$",
        rating: 0,
        category: "streaming",
        hasVariants: true,
        description: "🟣 Max (ex HBO Max) - El mejor contenido premium de HBO y Warner Bros.",
        features: [
            "Contenido HBO original",
            "Películas Warner Bros",
            "Series exclusivas",
            "4K disponible"
        ],
        variants: [
            { screens: "1", renewal: "$5.000", noRenewal: "$8.000" },
            { screens: "2", renewal: "$9.000", noRenewal: "$12.000" }
        ]
    },
    {
        id: 13,
        name: "Netflix Premium 4K",
        image: "https://via.placeholder.com/533x800/E50914/ffffff?text=Netflix",
        price: "8,00$ - 15,00$",
        priceRange: "desde 8,00$ hasta 15,00$",
        rating: 0,
        category: "streaming",
        hasVariants: true,
        description: "🔵 Netflix Premium 4K – Cuenta Compartida con perfil privado y PIN de seguridad.",
        features: [
            "🛡️ Perfil privado con PIN",
            "📺 Calidad Ultra HD (4K)",
            "👥 Cuenta compartida (1 o 2 perfiles)",
            "🔄 Transferencia automática si aparece 'Estoy de viaje'"
        ],
        variants: [
            { screens: "1", renewal: "$8.000", noRenewal: "$8.500" },
            { screens: "2", renewal: "$14.000", noRenewal: "$15.000" }
        ],
        conditions: [
            "⚠️ ¿Qué pasa si aparece 'Estoy de viaje' o 'Actualizar hogar'?",
            "👉 Tranquilo, nosotros transferimos tu perfil a otra cuenta para que sigas usando sin interrupciones.",
            "Esto aplica solo a cuentas compartidas (Estándar HD o Premium 4K)."
        ]
    },
    {
        id: 14,
        name: "Netflix Estándar HD",
        image: "https://via.placeholder.com/533x800/E50914/ffffff?text=Netflix+HD",
        price: "7,00$ - 14,00$",
        priceRange: "desde 7,00$ hasta 14,00$",
        rating: 0,
        category: "streaming",
        hasVariants: true,
        description: "🟢 Netflix Estándar HD – Cuenta Compartida con perfil privado.",
        features: [
            "🛡️ Perfil privado con PIN",
            "📺 Calidad HD (1080p)",
            "👥 Cuenta compartida (1 o 2 perfiles)",
            "✅ Sin mensajes si ambas pantallas están en el mismo Wi-Fi"
        ],
        variants: [
            { screens: "1", renewal: "$7.000", noRenewal: "$7.500" },
            { screens: "2", renewal: "$13.000", noRenewal: "$14.000" }
        ],
        conditions: [
            "📌 Cada 15 días puede aparecer en la TV el mensaje: 'Estoy de viaje' o 'Actualizar hogar'",
            "🛠️ Nosotros transferimos tu perfil sin que pierdas acceso.",
            "✅ Sin mensajes si ambas pantallas están en el mismo domicilio (En el mismo Wi-Fi)."
        ]
    },
    {
        id: 15,
        name: "Netflix Extra Privado",
        image: "https://via.placeholder.com/533x800/E50914/ffffff?text=Netflix+Private",
        price: "8,50$ - 9,50$",
        priceRange: "desde 8,50$ hasta 9,50$",
        rating: 0,
        category: "streaming",
        hasVariants: true,
        description: "🔴 Netflix Extra Privado – Cuenta Individual 100% privada y exclusiva.",
        features: [
            "✨ Cuenta 100% privada y exclusiva",
            "🔐 Sin mensajes ni bloqueos",
            "📺 Calidad Ultra HD (4K) garantizada",
            "🎯 Uso exclusivo personal"
        ],
        variants: [
            { screens: "1", renewal: "$8.500", noRenewal: "$9.500" }
        ]
    },
    {
        id: 16,
        name: "Prime Video",
        image: "https://via.placeholder.com/533x800/00A8E1/ffffff?text=Prime+Video",
        price: "4,50$ - 5,00$",
        priceRange: "desde 4,50$ hasta 5,00$",
        rating: 0,
        category: "streaming",
        hasVariants: true,
        description: "🚀 Prime Video - Contenido exclusivo de Amazon con series y películas originales.",
        features: [
            "Contenido exclusivo Amazon",
            "Series originales",
            "Películas premium",
            "Acceso global"
        ],
        variants: [
            { screens: "1", renewal: "$4.500", noRenewal: "$5.000" }
        ]
    },
    {
        id: 17,
        name: "Paramount+",
        image: "https://via.placeholder.com/533x800/0064FF/ffffff?text=Paramount%2B",
        price: "1,50$ - 2,00$",
        priceRange: "desde 1,50$ hasta 2,00$",
        rating: 0,
        category: "streaming",
        hasVariants: true,
        description: "🔵 Paramount+ – Perfil Privado con contenido exclusivo de CBS y Paramount.",
        features: [
            "Perfil privado",
            "Contenido CBS",
            "Películas Paramount",
            "Series exclusivas"
        ],
        variants: [
            { screens: "1", renewal: "$1.500", noRenewal: "$2.000" }
        ]
    },
    {
        id: 18,
        name: "Vix Premium",
        image: "https://via.placeholder.com/533x800/FF6B00/ffffff?text=Vix+Premium",
        price: "4,50$ - 5,50$",
        priceRange: "desde 4,50$ hasta 5,50$",
        rating: 0,
        category: "streaming",
        hasVariants: true,
        description: "📺 Vix Premium – Perfil Privado con el mejor contenido en español.",
        features: [
            "Perfil privado",
            "Contenido en español",
            "Telenovelas exclusivas",
            "Deportes en vivo"
        ],
        variants: [
            { screens: "1", renewal: "$4.500", noRenewal: "$5.500" }
        ]
    },
    {
        id: 19,
        name: "YouTube Premium",
        image: "https://via.placeholder.com/533x800/FF0000/ffffff?text=YouTube+Premium",
        price: "4,50$ - 12,00$",
        priceRange: "desde 4,50$ hasta 12,00$",
        rating: 0,
        category: "streaming",
        hasVariants: true,
        description: "▶ YouTube Premium – Grupo Familiar sin anuncios y con YouTube Music incluido.",
        features: [
            "Sin anuncios",
            "YouTube Music incluido",
            "Descargas offline",
            "Reproducción en segundo plano"
        ],
        variants: [
            { duration: "1 mes", renewal: "$4.500", noRenewal: "—" },
            { duration: "2 meses", renewal: "$8.000", noRenewal: "—" },
            { duration: "3 meses", renewal: "$12.000", noRenewal: "—" }
        ]
    },
    {
        id: 20,
        name: "Rakuten Viki",
        image: "https://via.placeholder.com/533x800/00C7BE/ffffff?text=Viki",
        price: "6,00$ - 6,50$",
        priceRange: "desde 6,00$ hasta 6,50$",
        rating: 0,
        category: "streaming",
        hasVariants: true,
        description: "🎌 Rakuten Viki – Perfil Privado con los mejores K-Dramas y contenido asiático.",
        features: [
            "Perfil privado",
            "K-Dramas exclusivos",
            "Contenido asiático",
            "Subtítulos en múltiples idiomas"
        ],
        variants: [
            { screens: "1", renewal: "$6.000", noRenewal: "$6.500" }
        ]
    },
    // Servicios IPTV
    {
        id: 21,
        name: "XTV en Vivo",
        image: "https://via.placeholder.com/533x800/FF4444/ffffff?text=XTV",
        price: "5,00$ - 15,50$",
        priceRange: "desde 5,00$ hasta 15,50$",
        rating: 0,
        category: "iptv",
        hasVariants: true,
        description: "✅ XTV en Vivo - Televisión en vivo con múltiples canales internacionales.",
        features: [
            "3 dispositivos simultáneos",
            "Canales internacionales",
            "Calidad HD/4K",
            "EPG incluido"
        ],
        variants: [
            { duration: "1 mes", devices: "3", price: "$5.000" },
            { duration: "2 meses", devices: "3", price: "$9.000" },
            { duration: "3 meses", devices: "3", price: "$15.500" }
        ]
    },
    {
        id: 22,
        name: "TV Online Plus",
        image: "https://via.placeholder.com/533x800/00AA44/ffffff?text=TV+Online",
        price: "5,50$ - 15,50$",
        priceRange: "desde 5,50$ hasta 15,50$",
        rating: 0,
        category: "iptv",
        hasVariants: true,
        description: "📡 TV Online Plus - Servicio IPTV premium con 3 dispositivos incluidos.",
        features: [
            "3 dispositivos simultáneos",
            "Canales premium",
            "Deportes en vivo",
            "Películas y series"
        ],
        variants: [
            { duration: "1 mes", price: "$5.500" },
            { duration: "2 meses", price: "$10.000" },
            { duration: "3 meses", price: "$15.500" }
        ]
    },
    {
        id: 23,
        name: "TV SG DIGITAL IPTV",
        image: "https://via.placeholder.com/533x800/8844AA/ffffff?text=SG+IPTV",
        price: "5,00$ - 12,50$",
        priceRange: "desde 5,00$ hasta 12,50$",
        rating: 0,
        category: "iptv",
        hasVariants: true,
        description: "📡 TV SG DIGITAL IPTV - Servicio IPTV con amplia variedad de canales.",
        features: [
            "3 dispositivos simultáneos",
            "Velocidad mínima +25 Mbps",
            "Compatible con Smart TV Android",
            "Smater Pro para TV sin Android"
        ],
        variants: [
            { duration: "1 mes", devices: "3", price: "$5.000" },
            { duration: "2 meses", devices: "3", price: "$9.000" },
            { duration: "3 meses", devices: "3", price: "$12.500" }
        ]
    },
    // Aplicación de Películas
    {
        id: 24,
        name: "App Películas y Series",
        image: "https://via.placeholder.com/533x800/FF8800/ffffff?text=Movies+App",
        price: "4,00$",
        rating: 0,
        category: "apps",
        hasVariants: false,
        description: "Aplicación de Películas y Series (Solo Android) - Acceso completo por 30 días.",
        features: [
            "Solo para Android",
            "30 días de acceso",
            "Hasta 3 dispositivos",
            "Películas y series ilimitadas"
        ]
    }
];

// Información adicional de servicios
const serviceInfo = {
    conditions: [
        "🔐 CONDICIONES DE USO – PROTEGÉ TU GARANTÍA",
        "",
        "🧾 Cada acceso es único. Si comprás 1 pantalla, usás 1 dispositivo.",
        "Cumplí estas reglas y tu servicio estará 100% protegido:",
        "",
        "❌ No cambies la contraseña",
        "❌ No agregues correos ni celulares", 
        "❌ No alquiles películas",
        "❌ No toques perfiles",
        "✅ Usá el perfil asignado",
        "✅ Contactanos siempre con respeto",
        "",
        "📩 Si respetás esto, el soporte es total"
    ],
    schedule: [
        "🕒 HORARIOS DE ATENCIÓN",
        "",
        "🗓 Lunes a Viernes: 10:30–12:00 / 19:30–23:30",
        "📩 Fuera de ese horario me encuentro en otro trabajo. Por favor, deja tu mensaje o audio y lo responderé en el próximo horario disponible.",
        "",
        "🗓 Sábados: 10:30–14:00 / 17:30–23:30",
        "",
        "🗓 Domingos: Horario flexible. Respondemos con algo de demora. ¡Gracias por tu comprensión!"
    ],
    compatibility: [
        {
            platform: "SG IPTV",
            smartTV: "✅ Compatible",
            tvWithoutAndroid: "✅ Solo si tiene la app Smater Pro",
            minSpeed: "⚠ +25 Mbps estables",
            otherDevices: "✅ Celulares, tablets, TV Box, PC, navegador"
        },
        {
            platform: "Nebula",
            smartTV: "✅ Compatible",
            tvWithoutAndroid: "❌ No compatible",
            minSpeed: "✅ +5 Mbps estables",
            otherDevices: "✅ Celulares, tablets, TV Box, PC, navegador"
        },
        {
            platform: "XTV en Vivo",
            smartTV: "✅ Compatible",
            tvWithoutAndroid: "❌ No compatible",
            minSpeed: "✅ +5 Mbps estables",
            otherDevices: "✅ Celulares, tablets, TV Box, PC, navegador"
        },
        {
            platform: "TV Online Plus",
            smartTV: "✅ Compatible",
            tvWithoutAndroid: "❌ No compatible",
            minSpeed: "✅ +5 Mbps estables",
            otherDevices: "✅ Celulares, tablets, TV Box, PC, navegador"
        }
    ],
    promotions: [
        "🎉 PROMOCIONES ÚNICAS (solo una vez por cliente en contratación y renovación)",
        "",
        "✅ TV Online Plus (3 dispositivos):",
        "• 3 meses: $14.500",
        "• 6 meses: $29.500",
        "",
        "✅ Nebula (3 dispositivos):",
        "• 3 meses: $14.700", 
        "• 6 meses: $29.500",
        "",
        "✅ XTV en Vivo (solo nuevos):",
        "• 1 mes: $3.500 (1 dispositivo)",
        "• 2 meses: $4.500 (1 dispositivo) / $5.500 (2 dispositivos)",
        "• 3 meses: $7.500 (2 dispositivos)"
    ],
    combo: [
        "🎬 Netflix 4K cuenta compartida + Max Platino",
        "Pantallas: 1",
        "Renovación: $13.000",
        "Sin renovación: $13.000"
    ]
};

// Función para obtener productos por categoría
function getProductsByCategory(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Función para buscar productos
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
}

// Función para obtener producto por ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}
