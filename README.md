<p align="center">
  <a href="https://reactjs.org/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="120" alt="React Logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# App Aprendizaje VARK y Test de Personalidad

Aplicación web para evaluar los estilos de aprendizaje VARK y el test de personalidad de Myers-Briggs, ayudando a los usuarios a comprender mejor sus fortalezas y estilos de aprendizaje.

## 📝 Descripción

Esta aplicación permite:

- Realizar el test de personalidad basado en la tipología de Myers-Briggs.
- Identificar estilos de aprendizaje mediante el método VARK.
- Analizar resultados de forma individual o grupal a través de dashboards interactivos.
- Facilitar el autoconocimiento y la optimización del aprendizaje en entornos educativos y laborales.

## 🛠️ Tecnologías Utilizadas

### **Frontend**

- [React.js](https://reactjs.org/) (Vite + TypeScript)
- [Tailwind CSS](https://tailwindcss.com/) para diseño responsivo y moderno.
- [React Query](https://tanstack.com/query/latest) para gestión de datos asincrónicos.
- [Chart.js](https://www.chartjs.org/) para visualización de gráficos interactivos.

### **Backend**

- [Nest.js](https://nestjs.com/) (TypeScript) con arquitectura modular.
- [PostgreSQL](https://www.postgresql.org/) como base de datos principal.
- [TypeORM](https://typeorm.io/) para gestión de la base de datos.
- [JWT](https://jwt.io/) para autenticación y manejo de roles.
- [pdfmake](http://pdfmake.org/) para generación de reportes en PDF.

## ✨ Funcionalidades Principales

- **Test VARK**: Formularios dinámicos para evaluar estilos de aprendizaje.
- **Test Myers-Briggs**: Preguntas categorizadas para identificar tipos de personalidad.
- **Dashboards**:
  - Visualización de resultados individuales y grupales.
  - Generación de gráficos interactivos.
- **Autenticación y roles**:
  - Usuarios: Acceso a pruebas y resultados.
  - Administradores: CRUD de preguntas y gestión de usuarios.
- **Exportación de resultados**: Generación de reportes en formato PDF.
- **Responsividad**: Diseño optimizado para dispositivos móviles y escritorio.
- **Formulario de contacto**: Envío de mensajes por correo electrónico.

## 📂 Estructura del Proyecto

```plaintext
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── App.tsx
│   └── ...
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── tests/
│   │   ├── results/
│   │   └── main.ts
│   └── ...
└── README.md
```

## 🚀 Despliegue

### **Requisitos previos**

- Node.js 16+
- PostgreSQL (instalado y configurado)
- Gestor de paquetes npm o yarn

### **Instalación**

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu_usuario/aprendizaje-vark-personalidad.git
   cd aprendizaje-vark-personalidad
   ```

2. Configura las variables de entorno para el frontend y backend:

   - **Frontend**: Crea un archivo `.env` en el directorio `frontend/` con las siguientes variables:
     ```env
     VITE_API_URL=http://localhost:3000/api
     ```
   - **Backend**: Crea un archivo `.env` en el directorio `backend/` con las siguientes variables:
     ```env
     DATABASE_URL=postgresql://usuario:password@localhost:5432/nombre_base_datos
     JWT_SECRET=tu_secreto
     ```

3. Instala las dependencias:

   - Frontend:
     ```bash
     cd frontend
     npm install
     ```
   - Backend:
     ```bash
     cd backend
     npm install
     ```

4. Inicia la aplicación:
   - Frontend:
     ```bash
     npm run dev
     ```
   - Backend:
     ```bash
     npm run start:dev
     ```

### **Despliegue en Producción**

- Usa servicios como [Vercel](https://vercel.com/) para el frontend.
- Usa [Render](https://render.com/) o [Heroku](https://www.heroku.com/) para el backend.

## 🛡️ Seguridad

- Los datos de los usuarios están protegidos mediante cifrado de contraseñas con `bcrypt`.
- La autenticación se maneja mediante `JWT`, asegurando accesos restringidos.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir:

1. Haz un fork del proyecto.
2. Crea una rama con tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -m 'Agregué una nueva funcionalidad'`).
4. Sube la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

---

¡Gracias por usar la App de Aprendizaje VARK y Test de Personalidad!
