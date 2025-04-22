FROM node:20-alpine

WORKDIR /app

# Copia só os arquivos de dependência primeiro
COPY package*.json ./

# Instala as dependências (incluindo o Nuxt CLI)
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta usada no dev (9000 por padrão)
EXPOSE 9000

# Usa o comando de desenvolvimento
CMD ["npm", "run", "dev"]
