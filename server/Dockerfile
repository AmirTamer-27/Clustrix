FROM node:18

RUN apt-get update && apt-get install -y python3 python3-pip

WORKDIR /app

RUN mkdir -p uploads

COPY package*.json ./
RUN npm install

COPY requirements.txt ./
RUN pip3 install --break-system-packages -r requirements.txt

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
