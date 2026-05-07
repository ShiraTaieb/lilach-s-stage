import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Server-side 4-digit PIN verification. Keeps the secret out of the browser bundle.
export const verifyAdminPin = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({ pin: z.string().regex(/^\d{4}$/) }).parse(input),
  )
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PIN ?? "1234";
    return { ok: data.pin === expected };
  });