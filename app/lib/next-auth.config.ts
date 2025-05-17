import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { Adapter } from 'next-auth/adapters';
import { NextAuthOptions } from 'next-auth';
import { GoogleProfile } from 'next-auth/providers/google';

// Crear un cliente de Prisma
const prisma = new PrismaClient();

// Definir tipos para las credenciales de prueba
interface UserCredentials {
  email: string;
  password: string;
  name: string;
}

const testUsers: Record<string, UserCredentials> = {
  'test@tacosbora.com': { email: 'test@tacosbora.com', password: 'test123', name: 'Usuario de Prueba' },
  'admin@tacosbora.com': { email: 'admin@tacosbora.com', password: 'admin123', name: 'Administrador' }
};

const adapter: Adapter = PrismaAdapter(prisma);

export const authOptions: NextAuthOptions = {
  adapter,
  providers: [
    // Credenciales de prueba
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const users = {
          'test@tacosbora.com': { password: 'test123', name: 'Usuario de Prueba' },
          'admin@tacosbora.com': { password: 'admin123', name: 'Administrador' }
        };

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = users[credentials.email];
        if (!user) {
          throw new Error('Invalid credentials');
        }

        if (user.password !== credentials.password) {
          throw new Error('Invalid credentials');
        }

        return {
          id: credentials.email,
          email: credentials.email,
          name: user.name
        };
      }
    }),

    // Google
    GoogleProvider({
      clientId: '85083338674-db3n8qs57ccgb4hm03972bvcutmfjhpn.apps.googleusercontent.com',
      clientSecret: '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',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),


  ],
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
