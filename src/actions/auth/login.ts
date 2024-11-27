"use server";
import { signIn } from "@/auth.config";
/* import { sleep } from "@/utils"; */
import { AuthError } from "next-auth";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {

    /* console.log("formData", Object.fromEntries(formData)); */
    /* await sleep(2); */
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success';

  } catch (error) {
    console.log({ error });
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "InvalidCredentials";
        default:
          return "UnknownError";
      }
    }
    throw error;
  }
}
