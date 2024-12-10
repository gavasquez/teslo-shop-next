"use server";
import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    if (!storedAddress) {
      return {
        ok: false,
        msg: "No hay dirección para eliminar",
      };
    }

    await prisma.userAddress.delete({
      where: {
        userId,
      },
    });

    return {
      ok: true,
      msg: "La dirección ha sido eliminada",
    };
  } catch (error) {
    return {
      ok: false,
      msg: "No se pudo eliminar la dirección",
    };
  }
};
