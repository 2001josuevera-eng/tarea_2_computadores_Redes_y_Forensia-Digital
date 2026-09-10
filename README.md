# Arquitectura de Computadores, Redes e Investigación de Ciberdelitos

## Objetivo
Este proyecto desarrolla un sitio web académico y visualmente moderno sobre arquitectura de computadores, fundamentos de redes de comunicaciones y su aplicación en la investigación de ciberdelitos y la forense digital.

## Tecnologías utilizadas
- HTML5
- CSS3
- JavaScript puro (Vanilla JavaScript)
- GitHub Codespaces
- GitHub Pages

## Estructura de carpetas
```text
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── README.md
└── .gitignore
```

## Cómo abrir el proyecto en GitHub Codespaces
1. Abre el repositorio en GitHub.
2. Haz clic en "Code" y selecciona "Codespaces".
3. Crea o abre un Codespace.
4. Una vez cargado, el proyecto estará listo para editarse en el navegador o en VS Code.

## Cómo ejecutar y probar el sitio
Como el proyecto es estático, puedes abrir directamente el archivo `index.html` en el navegador, o bien servirlo localmente con un servidor simple si lo prefieres.

Ejemplo con Python:
```bash
python3 -m http.server 8000
```
Luego accede a:
```text
http://localhost:8000
```

## Cómo publicar en GitHub Pages
1. En GitHub, ve a tu repositorio.
2. Abre "Settings".
3. Selecciona "Pages".
4. En "Source", elige "Deploy from a branch".
5. Configura:
   - Branch: `main`
   - Folder: `/ (root)`
6. Guarda los cambios.
7. GitHub generará una URL pública para el sitio.

## Cómo verificar que el sitio está disponible públicamente
1. Espera a que GitHub Pages procese la publicación.
2. Revisa la sección "Pages" del repositorio.
3. Usa la URL pública que GitHub proporciona.
4. Verifica que el sitio se carga correctamente en el navegador.

## Instrucciones para subir cambios
```bash
git add .
git commit -m "Crear sitio web académico de arquitectura redes y ciberdelitos"
git push origin main
```

## Notas importantes
- El sitio es completamente estático y compatible con GitHub Pages.
- No se requieren dependencias ni frameworks.
- La navegación, el modo oscuro, el modal del autor y el botón de compartir están implementados en JavaScript.
