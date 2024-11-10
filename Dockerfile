# Usamos una imagen base oficial de Node.js
FROM node:18

# Crear un directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
# (esto es para instalar las dependencias antes de copiar todo el código)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación al contenedor
COPY . .

# Exponer el puerto 3000 (el puerto que usará nuestra app)
EXPOSE 3000

# Definir el comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]
