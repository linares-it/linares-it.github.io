# Skill: Framework de Diseño y UI

## Stack Tecnológico
* Framework CSS: Tailwind CSS (vía CDN). No existe proceso de compilación externo.
* Iconografía: FontAwesome 6 (vía CDN `fas`, `fab`).

## Paleta de Colores (Dark Theme Strict)
* Fondo principal (Body/Secciones): `bg-[#0f172a]` (Slate 900)
* Fondo secundario (Tarjetas/Formularios): `bg-[#1e293b]` (Slate 800)
* Acentos y Botones principales: `bg-blue-600` / `text-blue-500` / `text-blue-400`
* Texto principal: `text-gray-300` (párrafos)
* Texto secundario: `text-gray-400` (descripciones menores)
* Bordes sutiles: `border-gray-800`

## Tipografía y Estructura
* Tipografía base: `font-sans`.
* Encabezados (`h1`, `h2`, `h3`): Siempre en `text-white` y `font-bold` o `font-extrabold`.
* Estructura responsiva: Usar el prefijo `md:` para transiciones de móvil a escritorio.
* Efectos hover: Usar variaciones sutiles (ej. `hover:text-blue-400`, `hover:border-blue-500/50`).
