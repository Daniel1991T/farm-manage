import { InferInsertModel } from "drizzle-orm";
import { integer, text, pgTable, date } from "drizzle-orm/pg-core";

export const Cow = pgTable("cow", {
  name: text("name").notNull(),
  registration_number: text("registration_number")
    .notNull()
    .unique()
    .primaryKey(),
  breed: text("breed").notNull(),
  weight: text("weight").notNull(),
  health_condition: text("health_condition").notNull(),
  sex: text("sex").notNull(),
  registration_number_father: text("registration_number_father").notNull(),
  registration_number_mother: text("registration_number_mother").notNull(),
  number_of_authorization: text("number_of_authorization"),
  expiration_authorization: text("expiration_authorization"),
  entry_date: text("entry_date").notNull(),
  color: text("color").notNull(),
  image: text("image").notNull(),
  age: text("age").notNull(),
  birth_date: text("birth_date").notNull(),
});

export type CowSchema = InferInsertModel<typeof Cow>;
