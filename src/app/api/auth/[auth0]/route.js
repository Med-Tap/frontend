import { handleAuth, handleLogin, handleCallback } from "@auth0/nextjs-auth0";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const GET = handleAuth({
    login: handleLogin({
        returnTo: "/dashboard",
        authorizationParams: {
            scope: "openid profile email", // Request ID token, profile, and email
        },
    }),
    callback: handleCallback({
        afterCallback: async (req, res) => {
            const decoded = jwt.decode(res.idToken);
            const { email, given_name, family_name } = decoded;
            try {
              await fetch(`${process.env.SERVER_URL}/user/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, given_name, family_name }),
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(`API error: ${errorData.message || 'Unknown error'}`);
                    });
                }
                return response.json(); // Parse JSON response
            })
            .then(data => {
                // Extract `hashId` from the response data
                const hashId = data.hashId; // Access the `hashId` property
                console.log('Hash ID:', hashId); // Use `hashId` as needed
                return NextResponse.redirect(new URL("/api/auth/login", process.env.AUTH0_BASE_URL));
            })
            } catch (error) {
                console.error("API call failed:", error);
                // If the API call fails, redirect the user back to the login page
                return NextResponse.redirect(new URL("/api/auth/login", process.env.AUTH0_BASE_URL));
            }
        },
    }),
});

export const POST = handleAuth();
