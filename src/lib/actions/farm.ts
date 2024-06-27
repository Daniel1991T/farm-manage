"use server";
import { createServerAction, inferServerActionInput } from "zsa";
import { AddFarmValidationSchema } from "../validation";
import db from "@/database/drizzle";
import { FarmsTable } from "@/database/schema";

export const registerFarmToDB = createServerAction()
  .input(AddFarmValidationSchema)
  .handler(async ({ input }) => {
    console.log(input);
    await db.insert(FarmsTable).values(input).execute();
    return { success: true };
  });

export type InputRegisterFarmType = inferServerActionInput<
  typeof registerFarmToDB
>;
