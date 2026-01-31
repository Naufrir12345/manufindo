import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        // Cek apakah user sudah ada
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
        }

        // Hash password agar aman di MySQL
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        return NextResponse.json({ message: "User created", userId: user.id }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}