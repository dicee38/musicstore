FROM node:18

RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  build-essential \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build


EXPOSE 3000
CMD ["npm", "run", "preview"]
