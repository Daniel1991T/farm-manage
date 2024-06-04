"use server";

import db from "@/database/drizzle";
import { addNewAnimalSchema } from "../validation";
import { Cow, CowSchema } from "@/database/schema";
import { createServerAction } from "zsa";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { and, eq, ilike } from "drizzle-orm";

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
  .input(z.array(z.number()))
  .handler(async ({ input }) => {
    console.log("deletedCows", input);

    await Promise.all(
      input.map(async (val) => {
        await db
          .delete(Cow)
          .where(eq(Cow.id, val))
          .catch((error) => {
            console.log(error);
          });
      })
    ).catch((error) => {
      throw error;
    });
    revalidatePath("/all-animals");
  });

export const updateCow = createServerAction()
  .input(z.object({ ...addNewAnimalSchema.shape, id: z.number() }))
  .handler(async ({ input }) => {
    console.log(input);

    await db
      .update(Cow)
      .set(input as CowSchema)
      .where(eq(Cow.id, input.id))
      .catch((error) => {
        throw error;
      });
    revalidatePath("/all-animals");
    return { success: true };
  });

export const getMatchingCows = createServerAction()
  .input(
    z.object({
      registration_number: z.string(),
      sex: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const response = await db
      .select({ registration_number: Cow.registration_number })
      .from(Cow)
      .where(
        and(
          eq(Cow.sex, input.sex),
          ilike(Cow.registration_number, `%${input.registration_number}%`)
        )
      )
      .limit(5);
    return response;
  });
