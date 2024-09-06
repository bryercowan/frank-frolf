import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/lib/prisma-client";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";

const sendVerificationRequest = async ({
  identifier,
  url,
  provider,
}: {
  identifier: string;
  url: string;
  provider: { server: any; from: string };
}) => {
  const { host } = new URL(url);
  const transport = createTransport(provider.server);

  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: `Sign in to ${host}\n\n${url}\n\n`,
    html: `<p>Sign in to <strong>${host}</strong></p><p><a href="${url}">Click here to sign in</a></p>`,
  });

  console.log("Email sent:", result);
};

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
          user: "apikey",
          pass: process.env.SENDGRID_API_KEY,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  pages: {
    signIn: "/auth/signin", // custom sign-in page if you want
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async signIn({
      user,
      account,
      profile,
      email,
    }: {
      user: { email?: string | null };
      account: any;
      profile?: any;
      email?: { verificationRequest?: boolean };
    }): Promise<boolean | string> {
      console.log(user);
      const emailAddress = user?.email;

      if (!emailAddress) return false;

      const whitelistedEmail = await prisma.whitelistedEmail.findUnique({
        where: { email: emailAddress },
      });
      console.log("HERE", whitelistedEmail);
      if (whitelistedEmail) {
        return true;
      } else {
        return "/auth/error?error=AccessDenied";
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  options: {
    secure: process.env.NODE_ENV === "production",
  },
};
