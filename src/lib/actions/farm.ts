"use server";
import {
  createServerAction,
  inferServerActionInput,
  inferServerActionReturnData,
} from "zsa";
import { AddFarmValidationSchema } from "../validation";
import db from "@/database/drizzle";
import { FarmsTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const registerFarmToDB = createServerAction()
  .input(AddFarmValidationSchema)
  .handler(async ({ input }) => {
    console.log(input);
    await db.insert(FarmsTable).values(input).execute();
    revalidatePath("/edit-profile");
    return { success: true };
  });

export type InputRegisterFarmType = inferServerActionInput<
  typeof registerFarmToDB
>;

export const updateFarmInDB = createServerAction()
  .input(AddFarmValidationSchema)
  .handler(async ({ input }) => {
    console.log(input);
    await db
      .update(FarmsTable)
      .set(input)
      .where(eq(FarmsTable.userId, input.userId))
      .execute();
    revalidatePath("/edit-profile");
    return { success: true };
  });

export type UpdateFarmFnType = inferServerActionInput<typeof updateFarmInDB>;

export const getFarmDetails = createServerAction()
  .input(z.object({ userId: z.string() }))
  .handler(async ({ input }) => {
    const farm = await db
      .select()
      .from(FarmsTable)
      .where(eq(FarmsTable.userId, input.userId));
    return farm.map((item) => {
      return {
        userId: item.userId,
        email: item.email,
        exploitation_code: item.exploitation_code || "",
        phone: item.phone || "",
        administrator: item.administrator || "",
        farm_name: item.farm_name,
        location: item.location || "",
        region: item.region || "",
        country: item.country || "",
        address: item.address || "",
        description: item.description || "",
      };
    })[0];
  });

export type ReturnFarmDetailsType = inferServerActionReturnData<
  typeof getFarmDetails
>;
