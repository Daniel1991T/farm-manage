"use server";

import db from "@/database/drizzle";
import { addNewAnimalSchema } from "../validation";
import { Cow, CowSchema } from "@/database/schema";
import { createServerAction } from "zsa";
import { revalidatePath } from "next/cache";

export const addCowToDB = createServerAction()
  .input(addNewAnimalSchema)
  .handler(async ({ input }) => {
    const response = await db.insert(Cow).values(input as CowSchema);
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
