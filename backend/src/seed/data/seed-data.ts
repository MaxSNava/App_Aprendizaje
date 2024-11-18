interface SeedvarkOpcion {
  textoOpcion: string;
  estilo: string;
}

interface SeedvarkQuestion {
  textoPregunta: string;
  opciones: SeedvarkOpcion[];
}

interface SeedmbtiOpcion {
  textoOpcion: string;
  puntaje: number;
  categoria: string;
}

interface SeedmbtiQuestion {
  textoPregunta: string;
  dimension: string;
  opciones: SeedmbtiOpcion[];
}

interface SeedData {
  varkQuestion: SeedvarkQuestion[];
  mbtiQuestion: SeedmbtiQuestion[];
}

export const initialData: SeedData = {
  varkQuestion: [
    {
      textoPregunta: '¿Usted cocinará algo especial para su familia?',
      opciones: [
        {
          textoOpcion: 'Preguntar a amigos por sugerencias.',
          estilo: 'A',
        },
        {
          textoOpcion: 'Dar una vista al recetario por ideas de las fotos.',
          estilo: 'V',
        },
        {
          textoOpcion:
            'Usar un libro de cocina donde usted sabe hay una buena receta.',
          estilo: 'R',
        },
        {
          textoOpcion:
            'Cocinar algo que usted sabe sin la necesidad de instrucciones.',
          estilo: 'K',
        },
      ],
    },
    {
      textoPregunta: '¿Usted escogerá alimento en un restaurante o un café?',
      opciones: [
        {
          textoOpcion:
            'Escuchar al mesero o pedir que amigos recomienden opciones.',
          estilo: 'A',
        },
        {
          textoOpcion:
            'Mirar lo qué otros comen o mirar dibujos de cada platillo.',
          estilo: 'V',
        },
        {
          textoOpcion: 'Escoger de las descripciones en el menú.',
          estilo: 'R',
        },
        {
          textoOpcion: 'Escoger algo que tienes o has tenido antes.',
          estilo: 'K',
        },
      ],
    },
    {
      textoPregunta:
        '¿Aparte del precio, qué más te influenciaría para comprar un libro de ciencia ficción?',
      opciones: [
        {
          textoOpcion: 'Un amigo habla acerca de él y te lo recomienda.',
          estilo: 'A',
        },
        {
          textoOpcion: 'Tienes historias reales, experiencias y ejemplos.',
          estilo: 'K',
        },
        {
          textoOpcion: 'Leyendo rápidamente partes de él.',
          estilo: 'R',
        },
        {
          textoOpcion: 'El diseño de la pasta es atractivo.',
          estilo: 'V',
        },
      ],
    },
    {
      textoPregunta:
        'Usted ha terminado una competencia o un examen y le gustaría tener alguna retroalimentación. ¿Cómo preferiría recibirla?',
      opciones: [
        {
          textoOpcion: 'Usando descripciones escritas de los resultados.',
          estilo: 'R',
        },
        {
          textoOpcion: 'Usando ejemplos de lo que usted ha hecho.',
          estilo: 'K',
        },
        {
          textoOpcion: 'Usando gráficos que muestran lo que usted ha logrado.',
          estilo: 'V',
        },
        {
          textoOpcion: 'De alguien que habla por usted.',
          estilo: 'A',
        },
      ],
    },
    {
      textoPregunta:
        'Usted tiene un problema con la rodilla. Usted preferiría que el doctor:',
      opciones: [
        {
          textoOpcion: 'Use un modelo de plástico y te enseñe lo que está mal.',
          estilo: 'K',
        },
        {
          textoOpcion: 'Te de una página de internet o algo para leer.',
          estilo: 'R',
        },
        {
          textoOpcion: 'Te describa lo qué está mal.',
          estilo: 'A',
        },
        {
          textoOpcion: 'Te enseñe un diagrama de lo que está mal.',
          estilo: 'V',
        },
      ],
    },
    {
      textoPregunta:
        'Usted está a punto de comprar una cámara digital o teléfono móvil. ¿Aparte del precio qué más influirá en tomar tu decisión?',
      opciones: [
        {
          textoOpcion: 'Probándolo.',
          estilo: 'K',
        },
        {
          textoOpcion: 'Es un diseño moderno y se mira bien.',
          estilo: 'V',
        },
        {
          textoOpcion: 'Leer los detalles acerca de sus características.',
          estilo: 'R',
        },
        {
          textoOpcion: 'El vendedor me informa acerca de sus características.',
          estilo: 'A',
        },
      ],
    },
    {
      textoPregunta:
        'Usted no está seguro cómo se deletrea trascendente o tracendente. ¿Usted qué haría?',
      opciones: [
        {
          textoOpcion: 'Escribir ambas palabras en un papel y escoger una.',
          estilo: 'K',
        },
        {
          textoOpcion: 'Pienso cómo suena cada palabra y escojo una.',
          estilo: 'A',
        },
        {
          textoOpcion: 'Busco la palabra en un diccionario.',
          estilo: 'R',
        },
        {
          textoOpcion: 'Veo la palabra en mi mente y escojo según cómo la veo.',
          estilo: 'V',
        },
      ],
    },
    {
      textoPregunta: '¿Qué te gusta más en las páginas de Internet?',
      opciones: [
        {
          textoOpcion:
            'Interesantes descripciones escritas, listas y explicaciones.',
          estilo: 'R',
        },
        {
          textoOpcion: 'Diseño interesante y características visuales.',
          estilo: 'V',
        },
        {
          textoOpcion: 'Cosas que con un clic pueda cambiar o examinar.',
          estilo: 'K',
        },
        {
          textoOpcion:
            'Canales donde puedo oír música, programas de radio o entrevistas.',
          estilo: 'A',
        },
      ],
    },
    {
      textoPregunta:
        'Usted está planeando unas vacaciones para un grupo. Usted quiere alguna observación de ellos acerca del plan. ¿Qué haría?',
      opciones: [
        {
          textoOpcion:
            'Usa un mapa o página de Internet para mostrarles los lugares.',
          estilo: 'V',
        },
        {
          textoOpcion: 'Describe algunos de los puntos sobresalientes.',
          estilo: 'A',
        },
        {
          textoOpcion: 'Darles una copia del itinerario impreso.',
          estilo: 'R',
        },
        {
          textoOpcion:
            'Llamarles por teléfono o mandar mensaje por correo electrónico.',
          estilo: 'K',
        },
      ],
    },
    {
      textoPregunta:
        'Usted está usando un libro, disco compacto o página de Internet para aprender a tomar fotos con su cámara digital nueva. Usted le gustaría tener:',
      opciones: [
        {
          textoOpcion:
            'Una oportunidad de hacer preguntas acerca de la cámara y sus características.',
          estilo: 'A',
        },
        {
          textoOpcion:
            'Esquemas o diagramas que muestran la cámara y la función de cada parte.',
          estilo: 'V',
        },
        {
          textoOpcion: 'Ejemplos de buenas y malas fotos y cómo mejorarlas.',
          estilo: 'K',
        },
        {
          textoOpcion:
            'Aclarar las instrucciones escritas con listas y puntos sobre qué hacer.',
          estilo: 'R',
        },
      ],
    },
    {
      textoPregunta:
        'Usted quiere aprender un programa nuevo, habilidad o juego en una computadora. ¿Qué hace?',
      opciones: [
        {
          textoOpcion: 'Hablar con gente que sabe acerca del programa.',
          estilo: 'A',
        },
        {
          textoOpcion: 'Leer las instrucciones que vienen en el programa.',
          estilo: 'R',
        },
        {
          textoOpcion:
            'Seguir los esquemas en el libro que acompaña el programa.',
          estilo: 'V',
        },
        {
          textoOpcion: 'Usar los controles o el teclado.',
          estilo: 'K',
        },
      ],
    },
    {
      textoPregunta:
        'Estás ayudando a alguien que quiere ir al aeropuerto, al centro del pueblo o a la estación del ferrocarril. ¿Qué haces?',
      opciones: [
        {
          textoOpcion: 'Va con la persona.',
          estilo: 'K',
        },
        {
          textoOpcion: 'Anota las direcciones en un papel (sin mapa).',
          estilo: 'R',
        },
        {
          textoOpcion: 'Les dice las direcciones.',
          estilo: 'A',
        },
        {
          textoOpcion: 'Les dibuja un croquis o les da un mapa.',
          estilo: 'V',
        },
      ],
    },
    {
      textoPregunta:
        'Recuerde un momento en su vida en que aprendió a hacer algo nuevo (no físico como andar en bicicleta). Usted aprendió mejor:',
      opciones: [
        {
          textoOpcion: 'Viendo una demostración.',
          estilo: 'V',
        },
        {
          textoOpcion:
            'Con instrucciones escritas, en un manual o libro de texto.',
          estilo: 'R',
        },
        {
          textoOpcion: 'Escuchando a alguien explicarlo o haciendo preguntas.',
          estilo: 'A',
        },
        {
          textoOpcion: 'Con esquemas y diagramas o pistas visuales.',
          estilo: 'K',
        },
      ],
    },
    {
      textoPregunta: 'Usted prefiere un maestro o conferencista que use:',
      opciones: [
        {
          textoOpcion: 'Demostraciones, modelos o sesiones prácticas.',
          estilo: 'K',
        },
        {
          textoOpcion: 'Folletos, libros o lecturas.',
          estilo: 'R',
        },
        {
          textoOpcion: 'Diagramas, esquemas o gráficos.',
          estilo: 'V',
        },
        {
          textoOpcion: 'Preguntas y respuestas, pláticas y oradores invitados.',
          estilo: 'A',
        },
      ],
    },
    {
      textoPregunta:
        'Un grupo de turistas quiere aprender acerca de parques o reservas naturales en su área. Usted:',
      opciones: [
        {
          textoOpcion: 'Los acompaña a un parque o reserva natural.',
          estilo: 'K',
        },
        {
          textoOpcion:
            'Les da un libro o folleto acerca de parques o reservas naturales.',
          estilo: 'R',
        },
        {
          textoOpcion:
            'Les da una plática acerca de parques o reservas naturales.',
          estilo: 'A',
        },
        {
          textoOpcion:
            'Les muestra imágenes de Internet, fotos o libros con dibujos.',
          estilo: 'V',
        },
      ],
    },
    {
      textoPregunta:
        'Usted tiene que hacer un discurso para una conferencia u ocasión especial. Usted hace:',
      opciones: [
        {
          textoOpcion:
            'Escribir el discurso y aprendérselo leyéndolo varias veces.',
          estilo: 'R',
        },
        {
          textoOpcion:
            'Reunir muchos ejemplos e historias para hacer el discurso verdadero y práctico.',
          estilo: 'K',
        },
        {
          textoOpcion:
            'Escribir algunas palabras clave y practicar el discurso repetidas veces.',
          estilo: 'A',
        },
        {
          textoOpcion:
            'Hacer diagramas o esquemas que te ayuden a explicar las cosas.',
          estilo: 'V',
        },
      ],
    },
  ],
  mbtiQuestion: [
    {
      textoPregunta:
        'Energía, focalización y actitud vital: ¿Cómo interactúa con su entorno?',
      dimension: 'E/I',
      opciones: [
        {
          textoOpcion: 'Extrovertido: Emprendedor y entusiasta.',
          puntaje: 1,
          categoria: 'E',
        },
        { textoOpcion: 'Introvertido: Reservado.', puntaje: 1, categoria: 'I' },
      ],
    },
    {
      textoPregunta:
        'Energía, focalización y actitud vital: ¿Cómo aborda situaciones nuevas?',
      dimension: 'E/I',
      opciones: [
        {
          textoOpcion: 'Extrovertido: Actúa y luego piensa.',
          puntaje: 1,
          categoria: 'E',
        },
        {
          textoOpcion: 'Introvertido: Piensa y luego actúa.',
          puntaje: 1,
          categoria: 'I',
        },
      ],
    },
    {
      textoPregunta:
        'Energía, focalización y actitud vital: ¿Cómo se siente en actividades sociales?',
      dimension: 'E/I',
      opciones: [
        {
          textoOpcion: 'Extrovertido: Le gusta rodearse de gente.',
          puntaje: 1,
          categoria: 'E',
        },
        {
          textoOpcion: 'Introvertido: Se siente a gusto a solas.',
          puntaje: 1,
          categoria: 'I',
        },
      ],
    },
    {
      textoPregunta: 'Manejo de información: ¿Cómo prefiere abordar problemas?',
      dimension: 'S/N',
      opciones: [
        {
          textoOpcion: 'Sensorial: Se enfoca en hechos específicos.',
          puntaje: 1,
          categoria: 'S',
        },
        {
          textoOpcion: 'Intuitivo: Piensa en las implicaciones futuras.',
          puntaje: 1,
          categoria: 'N',
        },
      ],
    },
    {
      textoPregunta: 'Manejo de información: ¿Cómo procesa la experiencia?',
      dimension: 'S/N',
      opciones: [
        {
          textoOpcion: 'Sensorial: Confía en la experiencia propia.',
          puntaje: 1,
          categoria: 'S',
        },
        {
          textoOpcion: 'Intuitivo: Confía en sus instintos.',
          puntaje: 1,
          categoria: 'N',
        },
      ],
    },
    {
      textoPregunta: 'Manejo de información: ¿Qué admira más?',
      dimension: 'S/N',
      opciones: [
        {
          textoOpcion: 'Sensorial: Soluciones prácticas.',
          puntaje: 1,
          categoria: 'S',
        },
        {
          textoOpcion: 'Intuitivo: Ideas creativas.',
          puntaje: 1,
          categoria: 'N',
        },
      ],
    },
    {
      textoPregunta: 'Actitud y toma de decisiones: ¿Cómo toma decisiones?',
      dimension: 'T/F',
      opciones: [
        {
          textoOpcion: 'Racional: Basado en lógica y objetividad.',
          puntaje: 1,
          categoria: 'T',
        },
        {
          textoOpcion: 'Emocional: Basado en valores y sensaciones.',
          puntaje: 1,
          categoria: 'F',
        },
      ],
    },
    {
      textoPregunta: 'Actitud y toma de decisiones: ¿Qué le motiva más?',
      dimension: 'T/F',
      opciones: [
        {
          textoOpcion: 'Racional: Alcanzar metas.',
          puntaje: 1,
          categoria: 'T',
        },
        {
          textoOpcion: 'Emocional: Reconocimiento y armonía.',
          puntaje: 1,
          categoria: 'F',
        },
      ],
    },
    {
      textoPregunta:
        'Actitud y toma de decisiones: ¿Cómo responde a conflictos?',
      dimension: 'T/F',
      opciones: [
        {
          textoOpcion: 'Racional: Argumenta y debate.',
          puntaje: 1,
          categoria: 'T',
        },
        {
          textoOpcion: 'Emocional: Evita discusiones.',
          puntaje: 1,
          categoria: 'F',
        },
      ],
    },
    {
      textoPregunta: 'Ambiente de trabajo: ¿Cómo prefiere trabajar?',
      dimension: 'J/P',
      opciones: [
        {
          textoOpcion: 'Calificador: Trabaja primero, juega después.',
          puntaje: 1,
          categoria: 'J',
        },
        {
          textoOpcion: 'Perceptivo: Juega primero, trabaja después.',
          puntaje: 1,
          categoria: 'P',
        },
      ],
    },
    {
      textoPregunta: 'Ambiente de trabajo: ¿Cómo organiza su tiempo?',
      dimension: 'J/P',
      opciones: [
        {
          textoOpcion: 'Calificador: Presta atención al tiempo, puntualidad.',
          puntaje: 1,
          categoria: 'J',
        },
        {
          textoOpcion: 'Perceptivo: Menos consciente del tiempo, impuntual.',
          puntaje: 1,
          categoria: 'P',
        },
      ],
    },
    {
      textoPregunta: 'Ambiente de trabajo: ¿Cómo maneja las reglas?',
      dimension: 'J/P',
      opciones: [
        {
          textoOpcion: 'Calificador: Justifica la mayoría de las reglas.',
          puntaje: 1,
          categoria: 'J',
        },
        {
          textoOpcion: 'Perceptivo: Cuestiona muchas reglas.',
          puntaje: 1,
          categoria: 'P',
        },
      ],
    },
    {
      textoPregunta: 'Ambiente de trabajo: ¿Cómo prefiere los planes?',
      dimension: 'J/P',
      opciones: [
        {
          textoOpcion: 'Calificador: Le gusta hacer y atenerse a planes.',
          puntaje: 1,
          categoria: 'J',
        },
        {
          textoOpcion: 'Perceptivo: Prefiere flexibilidad en los planes.',
          puntaje: 1,
          categoria: 'P',
        },
      ],
    },
  ],
};
