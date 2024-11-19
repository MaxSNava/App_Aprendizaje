-- public.auth definition

-- Drop table

-- DROP TABLE public.auth;

CREATE TABLE public.auth (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	nickname text NOT NULL,
	"password" text NOT NULL,
	"fullName" text NOT NULL,
	"isActive" bool DEFAULT true NOT NULL,
	roles _text DEFAULT '{user}'::text[] NOT NULL,
	CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY (id),
	CONSTRAINT "UQ_f32e9ba39f8db7207e6bc2e4ccf" UNIQUE (nickname)
);


-- public.contacto definition

-- Drop table

-- DROP TABLE public.contacto;

CREATE TABLE public.contacto (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	nombre text NOT NULL,
	email text NOT NULL,
	mensaje text NOT NULL,
	fecha timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "PK_fcab8128cce0aac92da26cf1883" PRIMARY KEY (id)
);


-- public.grupos definition

-- Drop table

-- DROP TABLE public.grupos;

CREATE TABLE public.grupos (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	nombre text NOT NULL,
	descripcion text NULL,
	CONSTRAINT "PK_34de64ec8a5ecd99afb23b2bd62" PRIMARY KEY (id),
	CONSTRAINT "UQ_9a5da7aad7bec931a333f80fafd" UNIQUE (nombre)
);


-- public.mbti_preguntas definition

-- Drop table

-- DROP TABLE public.mbti_preguntas;

CREATE TABLE public.mbti_preguntas (
	id serial4 NOT NULL,
	"textoPregunta" text NOT NULL,
	dimension varchar(4) NOT NULL,
	CONSTRAINT "PK_6e051f30290eef900509e3ccf82" PRIMARY KEY (id)
);


-- public.resultados_mbti definition

-- Drop table

-- DROP TABLE public.resultados_mbti;

CREATE TABLE public.resultados_mbti (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	extrovertido int4 DEFAULT 0 NOT NULL,
	introvertido int4 DEFAULT 0 NOT NULL,
	sensorial int4 DEFAULT 0 NOT NULL,
	intuitivo int4 DEFAULT 0 NOT NULL,
	racional int4 DEFAULT 0 NOT NULL,
	emocional int4 DEFAULT 0 NOT NULL,
	calificador int4 DEFAULT 0 NOT NULL,
	perceptivo int4 DEFAULT 0 NOT NULL,
	"tipoPersonalidad" varchar(4) NOT NULL,
	CONSTRAINT "PK_1d88ed3624e02f275f5a6330c85" PRIMARY KEY (id)
);


-- public.resultados_vark definition

-- Drop table

-- DROP TABLE public.resultados_vark;

CREATE TABLE public.resultados_vark (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	visual int4 DEFAULT 0 NOT NULL,
	auditivo int4 DEFAULT 0 NOT NULL,
	"lecturaEscritura" int4 DEFAULT 0 NOT NULL,
	kinestesico int4 DEFAULT 0 NOT NULL,
	"tipoResultado" varchar(50) NOT NULL,
	CONSTRAINT "PK_b34715357290c7004e017e3abf9" PRIMARY KEY (id)
);


-- public.usuarios definition

-- Drop table

-- DROP TABLE public.usuarios;

CREATE TABLE public.usuarios (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	nombre text NOT NULL,
	email text NOT NULL,
	"fechaRegistro" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY (id),
	CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE (email)
);


-- public.vark_preguntas definition

-- Drop table

-- DROP TABLE public.vark_preguntas;

CREATE TABLE public.vark_preguntas (
	id serial4 NOT NULL,
	"textoPregunta" text NOT NULL,
	CONSTRAINT "PK_901203aa332bcb7416b330aa0c0" PRIMARY KEY (id)
);


-- public.mbti_opciones definition

-- Drop table

-- DROP TABLE public.mbti_opciones;

CREATE TABLE public.mbti_opciones (
	id serial4 NOT NULL,
	"textoOpcion" varchar(255) NOT NULL,
	puntaje int4 NOT NULL,
	categoria varchar(1) NOT NULL,
	"preguntaId" int4 NULL,
	CONSTRAINT "PK_8cf7fb376d341e7c347355857e7" PRIMARY KEY (id),
	CONSTRAINT "FK_578b375dd92653398e466a18fc9" FOREIGN KEY ("preguntaId") REFERENCES public.mbti_preguntas(id) ON DELETE CASCADE
);


-- public.pruebas definition

-- Drop table

-- DROP TABLE public.pruebas;

CREATE TABLE public.pruebas (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	"tipoPrueba" text NOT NULL,
	"fechaRealizacion" timestamp DEFAULT now() NOT NULL,
	"usuarioId" uuid NULL,
	"resultadoVarkId" uuid NULL,
	"resultadoMbtiId" uuid NULL,
	CONSTRAINT "PK_0f9ac3157f5bd684fb628d4199b" PRIMARY KEY (id),
	CONSTRAINT "REL_9ad2002c1c37225517ea76b579" UNIQUE ("resultadoVarkId"),
	CONSTRAINT "REL_c2de8b7757f4304b0ec4b796fa" UNIQUE ("resultadoMbtiId"),
	CONSTRAINT "FK_61056b705a6cc158e5d47d88884" FOREIGN KEY ("usuarioId") REFERENCES public.usuarios(id) ON DELETE CASCADE,
	CONSTRAINT "FK_9ad2002c1c37225517ea76b5793" FOREIGN KEY ("resultadoVarkId") REFERENCES public.resultados_vark(id),
	CONSTRAINT "FK_c2de8b7757f4304b0ec4b796fad" FOREIGN KEY ("resultadoMbtiId") REFERENCES public.resultados_mbti(id)
);


-- public.respuestas_mbti definition

-- Drop table

-- DROP TABLE public.respuestas_mbti;

CREATE TABLE public.respuestas_mbti (
	id serial4 NOT NULL,
	"pruebaId" uuid NULL,
	"preguntaId" int4 NULL,
	"opcionId" int4 NULL,
	CONSTRAINT "PK_ff84909d2a2d75dd5cc236fdc03" PRIMARY KEY (id),
	CONSTRAINT "FK_5aecf6990f4467c0a39eead1155" FOREIGN KEY ("opcionId") REFERENCES public.mbti_opciones(id) ON DELETE CASCADE,
	CONSTRAINT "FK_875be2131fcc154dec9763e8e65" FOREIGN KEY ("preguntaId") REFERENCES public.mbti_preguntas(id) ON DELETE CASCADE,
	CONSTRAINT "FK_fdede744a1c29ad97b8d98c47dc" FOREIGN KEY ("pruebaId") REFERENCES public.pruebas(id) ON DELETE CASCADE
);


-- public.usuario_grupos definition

-- Drop table

-- DROP TABLE public.usuario_grupos;

CREATE TABLE public.usuario_grupos (
	"usuariosId" uuid NOT NULL,
	"gruposId" uuid NOT NULL,
	CONSTRAINT "PK_cad1eb0e988e2fd6d4961d66bc4" PRIMARY KEY ("usuariosId", "gruposId"),
	CONSTRAINT "FK_5b52f7275046bf6cbe7adb97856" FOREIGN KEY ("usuariosId") REFERENCES public.usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "FK_e573dd8f4bda9e6dc338a3bdaaf" FOREIGN KEY ("gruposId") REFERENCES public.grupos(id)
);
CREATE INDEX "IDX_5b52f7275046bf6cbe7adb9785" ON public.usuario_grupos USING btree ("usuariosId");
CREATE INDEX "IDX_e573dd8f4bda9e6dc338a3bdaa" ON public.usuario_grupos USING btree ("gruposId");


-- public.vark_opciones definition

-- Drop table

-- DROP TABLE public.vark_opciones;

CREATE TABLE public.vark_opciones (
	id serial4 NOT NULL,
	"textoOpcion" varchar(255) NOT NULL,
	estilo varchar(1) NOT NULL,
	"preguntaId" int4 NULL,
	CONSTRAINT "PK_0ea3af4aac7cd1cd036ea861529" PRIMARY KEY (id),
	CONSTRAINT "FK_02704730a0e2c6028a247d1a952" FOREIGN KEY ("preguntaId") REFERENCES public.vark_preguntas(id) ON DELETE CASCADE
);


-- public.respuestas_vark definition

-- Drop table

-- DROP TABLE public.respuestas_vark;

CREATE TABLE public.respuestas_vark (
	id serial4 NOT NULL,
	"pruebaId" uuid NULL,
	"preguntaId" int4 NULL,
	"opcionId" int4 NULL,
	CONSTRAINT "PK_4c768f9bdc668cb714648a5c8a4" PRIMARY KEY (id),
	CONSTRAINT "FK_8e38e29dabbc9bb84fd628b5b56" FOREIGN KEY ("preguntaId") REFERENCES public.vark_preguntas(id) ON DELETE CASCADE,
	CONSTRAINT "FK_e50398a78c01d20bf43b8d7eec3" FOREIGN KEY ("pruebaId") REFERENCES public.pruebas(id) ON DELETE CASCADE,
	CONSTRAINT "FK_e91d4fc77f000ca84551c983a26" FOREIGN KEY ("opcionId") REFERENCES public.vark_opciones(id) ON DELETE CASCADE
);