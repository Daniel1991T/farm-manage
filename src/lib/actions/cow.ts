"use server";

import db from "@/database/drizzle";
import { addNewAnimalSchema } from "../validation";
import { Cow, CowSchema } from "@/database/schema";
import { createServerAction } from "zsa";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { eq, sql } from "drizzle-orm";

export const addCowToDB = createServerAction()
  .input(addNewAnimalSchema)
  .handler(async ({ input }) => {
    await db.insert(Cow).values(input as CowSchema);
    revalidatePath("/all-animals");
    return { success: true };
  });

export const getAllCows = createServerAction().handler(async () => {
  try {
    const cows = await db.select().from(Cow).execute();
    return cows;
  } catch (error) {
    return error;
  }
});

export const deletedCows = createServerAction()
  .input(z.array(z.string()))
  .handler(async ({ input }) => {
    await Promise.all(
      input.map(async (val) => {
        await db.delete(Cow).where(eq(Cow.registration_number, val));
      })
    );
    revalidatePath("/all-animals");
  });
