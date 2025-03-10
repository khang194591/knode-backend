# -----------------------
# Step 1: Base Image (Node.js 22)
# -----------------------
FROM node:22-alpine AS base
WORKDIR /app

# Install dependencies separately to leverage caching
COPY package.json yarn.lock ./
RUN yarn install --production

# -----------------------
# Step 2: Install Development Dependencies
# -----------------------
FROM node:22-alpine AS dev-deps
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# -----------------------
# Step 3: Build with SWC
# -----------------------
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=dev-deps /app/node_modules ./node_modules

COPY . .

RUN yarn build

# -----------------------
# Step 4: Final Production Image
# -----------------------
FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY package.json ./

# Expose port
EXPOSE 3000

# Start the NestJS application
CMD ["node", "dist/main.js"]
