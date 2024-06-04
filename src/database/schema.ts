import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { text, pgTable, serial, integer } from "drizzle-orm/pg-core";

export const Cow = pgTable("cow", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  registration_number: text("registration_number").unique(),
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
export type CowTableSelect = InferSelectModel<typeof Cow>;

export const NewBornTable = pgTable("new_born", {
  id: serial("id").primaryKey(),
  mainTableId: integer("main_table_id").references(() => Cow.id, {
    onDelete: "cascade",
  }),
});

export type NewBornInsertModel = InferInsertModel<typeof NewBornTable>;
export type NewBornTableSelect = InferSelectModel<typeof NewBornTable>;
export type NewBornTableSchema = CowSchema & NewBornTableSelect;
