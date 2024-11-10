-- Tabla de Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'usuario', -- Puede ser 'usuario' o 'admin'
    grupo_id INT REFERENCES grupos(id),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Grupos para análisis grupales
CREATE TABLE grupos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

-- Relación entre Usuarios y Grupos
ALTER TABLE usuarios ADD CONSTRAINT fk_grupo FOREIGN KEY (grupo_id) REFERENCES grupos(id);

-- Tabla de Pruebas (Cada vez que un usuario realiza un test VARK o MBTI)
CREATE TABLE pruebas (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo_prueba VARCHAR(50) NOT NULL, -- VARK o MBTI
    fecha_realizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Preguntas VARK
CREATE TABLE vark_preguntas (
    id SERIAL PRIMARY KEY,
    texto_pregunta TEXT NOT NULL
);

-- Tabla de Opciones de Respuesta para VARK
CREATE TABLE vark_opciones (
    id SERIAL PRIMARY KEY,
    pregunta_id INT REFERENCES vark_preguntas(id) ON DELETE CASCADE,
    texto_opcion VARCHAR(255) NOT NULL,
    estilo VARCHAR(50) NOT NULL -- Valores posibles: 'V', 'A', 'R', 'K'
);

-- Tabla de Respuestas del Usuario en VARK
CREATE TABLE respuestas_vark (
    id SERIAL PRIMARY KEY,
    prueba_id INT REFERENCES pruebas(id) ON DELETE CASCADE,
    pregunta_id INT REFERENCES vark_preguntas(id) ON DELETE CASCADE,
    opcion_id INT REFERENCES vark_opciones(id) ON DELETE CASCADE
);

-- Tabla de Resultados VARK
CREATE TABLE resultados_vark (
    id SERIAL PRIMARY KEY,
    prueba_id INT REFERENCES pruebas(id) ON DELETE CASCADE,
    visual INT DEFAULT 0,
    auditivo INT DEFAULT 0,
    lectura_escritura INT DEFAULT 0,
    kinestesico INT DEFAULT 0,
    tipo_resultado VARCHAR(50) NOT NULL -- Ejemplo: "Visual", "Auditivo", "Lectura/Escritura", "Kinestésico", "Multimodal"
);

-- Tabla de Preguntas MBTI
CREATE TABLE mbti_preguntas (
    id SERIAL PRIMARY KEY,
    texto_pregunta TEXT NOT NULL,
    dimension VARCHAR(50) NOT NULL -- Ejemplo: "E/I", "S/N", "T/F", "J/P"
);

-- Tabla de Opciones de Respuesta para MBTI
CREATE TABLE mbti_opciones (
    id SERIAL PRIMARY KEY,
    pregunta_id INT REFERENCES mbti_preguntas(id) ON DELETE CASCADE,
    texto_opcion VARCHAR(255) NOT NULL,
    puntaje INT NOT NULL, -- Puntos para cada respuesta
    categoria VARCHAR(50) NOT NULL -- Ejemplo: "E", "I", "S", "N", "T", "F", "J", "P"
);

-- Tabla de Respuestas del Usuario en MBTI
CREATE TABLE respuestas_mbti (
    id SERIAL PRIMARY KEY,
    prueba_id INT REFERENCES pruebas(id) ON DELETE CASCADE,
    pregunta_id INT REFERENCES mbti_preguntas(id) ON DELETE CASCADE,
    opcion_id INT REFERENCES mbti_opciones(id) ON DELETE CASCADE
);

-- Tabla de Resultados MBTI
CREATE TABLE resultados_mbti (
    id SERIAL PRIMARY KEY,
    prueba_id INT REFERENCES pruebas(id) ON DELETE CASCADE,
    extrovertido INT DEFAULT 0,
    introvertido INT DEFAULT 0,
    sensorial INT DEFAULT 0,
    intuitivo INT DEFAULT 0,
    racional INT DEFAULT 0,
    emocional INT DEFAULT 0,
    calificador INT DEFAULT 0,
    perceptivo INT DEFAULT 0,
    tipo_personalidad VARCHAR(4) -- Ejemplo: "INTJ", "ENFP", etc.
);

-- Tabla de Contacto para correo electrónico
CREATE TABLE contacto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
