import { handleAuth, handleLogin, handleCallback } from "@auth0/nextjs-auth0";
import { NextResponse } from 'next/server';

export const GET = handleAuth({
  login: handleLogin({
    returnTo: '/dashboard',
  }),
  callback: handleCallback({
    afterCallback: (_req, _res, session) => {
      return NextResponse.redirect(new URL('/dashboard', process.env.AUTH0_BASE_URL));
    },
  }),
});

export const POST = handleAuth();