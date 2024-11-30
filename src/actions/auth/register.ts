'use server';
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  try {
    // Verificar si el correo ya está registrado
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (existingUser) {
      return {
        ok: false,
        message: "No se puedo crear el usuario, ya existe un usuario con ese correo",
      };
    }

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLowerCase(), // Convertir a minúsculas
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    console.log(user);

    return {
      ok: true,
      user: user,
      message: "Usuario creado",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo registrar el usuario",
    };
  }
}
