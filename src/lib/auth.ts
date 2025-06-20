import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing credentials');
                }
                const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!user || !user.password) {
                    throw new Error('No user found');
                }
                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordCorrect) {
                    throw new Error('Incorrect password');
                }
                return user;
            }
        })
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = (token as any).role;
            }
            return session;
        }
    },
    pages: { signIn: '/login' },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
};

// Función helper para obtener la sesión en el servidor de forma consistente
export const getAuthSession = () => getServerSession(authOptions);