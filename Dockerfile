FROM node:26-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./

RUN pnpm install

COPY . .

EXPOSE 4321

CMD ["sh", "-c", "rm -rf .astro && pnpm dev --host 0.0.0.0"]
