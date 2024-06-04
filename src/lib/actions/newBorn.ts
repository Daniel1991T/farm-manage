"use server";

import db from "@/database/drizzle";
import {
  Cow,
  CowSchema,
  NewBornTable,
  NewBornTableSchema,
} from "@/database/schema";
import { revalidatePath } from "next/cache";
import { createServerAction, inferServerActionInput } from "zsa";
import { NewBornValidationSchema, addNewAnimalSchema } from "../validation";
import { on } from "events";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const addNewBornToDB = createServerAction()
  .input(NewBornValidationSchema)
  .handler(async ({ input }) => {
    const respId = await db
      .insert(Cow)
      .values({
        ...input,
        registration_number:
          input.registration_number?.length === 0
            ? null
            : input.registration_number,
      } as CowSchema)
      .returning({ id: Cow.id });
    if (!respId[0].id) {
      return { success: false };
    }
    await db
      .insert(NewBornTable)
      .values({ mainTableId: respId[0].id })
      .execute();
    revalidatePath("/born");
    revalidatePath("/all-animals");
    return { success: true };
  });

export type FnType = inferServerActionInput<typeof addNewBornToDB>;

export const getNewBorn = createServerAction().handler(async () => {
  try {
    const newBorn = await db
      .select()
      .from(Cow)
      .innerJoin(NewBornTable, eq(NewBornTable.mainTableId, Cow.id));
    const response = newBorn.map((item) => {
      return {
        ...item.cow,
        ...item.new_born,
      };
    }) as NewBornTableSchema[];
    return response;
  } catch (error) {
    return error;
  }
});

export const updateNewBorn = createServerAction()
  .input(z.object({ ...addNewAnimalSchema.shape, id: z.number() }))
  .handler(async ({ input }) => {
    console.log("update: -> ", input);

    await db
      .update(Cow)
      .set(input as CowSchema)
      .where(eq(Cow.id, input.id))
      .catch((error) => {
        throw error;
      });
    revalidatePath("/all-animals");
    revalidatePath("/born");
    return { success: true };
  });

export type UpdateFnType = inferServerActionInput<typeof updateNewBorn>;

export const deleteNewBorn = createServerAction()
  .input(z.array(z.number()))
  .handler(async ({ input }) => {
    console.log("deletedCows", input);

    await Promise.all(
      input.map(async (val) => {
        await db
          .delete(NewBornTable)
          .where(eq(NewBornTable.id, val))
          .catch((error) => {
            console.log(error);
          });
      })
    ).catch((error) => {
      throw error;
    });
    revalidatePath("/born");
  });
