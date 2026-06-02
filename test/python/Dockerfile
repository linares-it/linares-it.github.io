FROM python:3.12-slim

WORKDIR /app

# Copiar solo el txt primero para optimizar la caché de Docker
COPY test/python/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del repositorio (src, scripts, tests, etc.)
COPY . .

# Ejecutar las pruebas apuntando al directorio correcto
CMD ["pytest", "test/python/", "-v"]