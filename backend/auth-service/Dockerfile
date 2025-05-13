FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4001

CMD ["sh", "-c", "npx prisma generate && node index.js"]
