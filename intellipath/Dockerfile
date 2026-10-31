# ==============================================================================
# Base Stage: Lightweight & Production-Proven Node.js 20 Debian Slim
# ==============================================================================
FROM node:20-bookworm-slim AS base

# Install required system packages for Prisma ORM, SSL/TLS certificates, and Healthchecks
RUN apt-get update && \
    apt-get install -y --no-install-recommends openssl ca-certificates curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# ==============================================================================
# Stage 1: Install Dependencies
# ==============================================================================
FROM base AS deps

# Copy dependency manifests and Prisma schema for efficient Docker layer caching
COPY package.json package-lock.json* .npmrc* ./
COPY prisma ./prisma/

# Install exact dependencies deterministically with legacy peer dependency resolution
RUN npm ci --legacy-peer-deps --no-audit

# ==============================================================================
# Stage 2: Build Application
# ==============================================================================
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment settings for optimized Next.js production build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Client-side build arguments (baked into client bundles at build time)
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YXJ0aXN0aWMtcmVwdGlsZS0yNC5jbGVyay5hY2NvdW50cy5kZXYk
ARG NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
ARG NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL=$NEXT_PUBLIC_CLERK_SIGN_IN_URL
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL=$NEXT_PUBLIC_CLERK_SIGN_UP_URL
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=$NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=$NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL

# Generate Prisma Client for native Linux runtime (debian-openssl-3.0.x)
RUN npx prisma generate

# Build Next.js application in standalone output mode
RUN npm run build

# ==============================================================================
# Stage 3: Production Runner (Hardened, Secure Non-Root, Ultra-Slim)
# ==============================================================================
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy static assets and public directory
COPY --from=builder /app/public ./public

# Prepare .next directory with proper permissions for caching
RUN mkdir .next && chown node:node .next

# Copy standalone build output and static bundle with non-root node ownership
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/prisma ./prisma

# Use standard non-root node user (UID: 1000) for security compliance
USER node

EXPOSE 3000

# Automated Healthcheck Probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD curl -f http://127.0.0.1:3000/api/health || exit 1

CMD ["node", "server.js"]
