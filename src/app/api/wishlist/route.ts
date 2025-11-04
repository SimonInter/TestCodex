import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_KEY = "atelier-wishlist";

export async function GET() {
  const cookieStore = cookies();
  const data = cookieStore.get(COOKIE_KEY)?.value;
  return NextResponse.json(data ? JSON.parse(data) : []);
}

export async function POST(request: Request) {
  const body = await request.json();
  const cookieStore = cookies();
  const current = cookieStore.get(COOKIE_KEY)?.value;
  const wishlist: string[] = current ? JSON.parse(current) : [];

  if (!wishlist.includes(body.productId)) {
    wishlist.push(body.productId);
  }

  const response = NextResponse.json(wishlist);
  response.cookies.set(COOKIE_KEY, JSON.stringify(wishlist), { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return response;
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const cookieStore = cookies();
  const current = cookieStore.get(COOKIE_KEY)?.value;
  let wishlist: string[] = current ? JSON.parse(current) : [];
  wishlist = wishlist.filter((id) => id !== body.productId);
  const response = NextResponse.json(wishlist);
  response.cookies.set(COOKIE_KEY, JSON.stringify(wishlist), { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return response;
}
