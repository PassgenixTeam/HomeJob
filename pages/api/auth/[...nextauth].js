import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { text, html } from "@/utils/sendVerificationRequest";
import { createTransport } from "nodemailer";
// import clientPromise from "../../../utils/database/connectDB";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserService } from "/utils/services/userService.ts";
import jwt from "jsonwebtoken";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
      
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    //   allowDangerousEmailAccountLinking: true,
    // }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          const userResponse = await UserService.LOGIN({ email, password });
          if (userResponse?.data?.data) {
            userResponse.data.data.user.tokenInfo =
              userResponse.data.data.token;
            return userResponse.data.data.user;
          } else {
            return null;
          }
        } catch (error) {
          
          throw new Error(error.response?.data.message);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 100 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryptionKey: process.env.JWT_SECRET,
  },
  pages: {
    error: '/login',
    signIn: '/login',
  },
  callbacks: {
    async signIn({token, account,user, profile }){
      if (account.provider === "google"||account.provider === "facebook"||account.provider === "github") {
        var tokenSocial = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          data: {
            loginBy:account.provider,
            country:account.provider==="github"?profile.location:profile.locale,
            name:user.name,
            email:user.email,
            avatarUrl:user.image
          }
        }, process.env.JWT_SECRET);
        try {
          const userResponse = await UserService.LOGIN_SOCIAL({
            token:tokenSocial,
            loginBy:account.provider
          })
          if (userResponse?.data?.data) {
            if(userResponse.data.data.token){
              userResponse.data.data.user.tokenInfo =
                userResponse.data.data.token;
            }
            Object.assign(profile, userResponse.data.data.user);
          }
        } catch (error) {
          throw new Error(error.response?.data.message)
        }
      }
      return true 
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user, account, profile,trigger,session }) {

      if (trigger === "update" && session?.role) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.role = session.role
      }
      if (user) {
        if(account.provider!=="credentials"){
          Object.assign(token, profile)
        }else{
          Object.assign(token, user);
        }
      }
      return token;
    },
    async session({ session, user, token }) {
      Object.assign(session.user, token);
      return session;
    },
  },
  // adapter: MongoDBAdapter(clientPromise),
};
export default NextAuth(authOptions);
