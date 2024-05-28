import { serial } from "drizzle-orm/mysql-core";
import { integer, text, boolean, pgTable, date } from "drizzle-orm/pg-core";

export const Cow = pgTable("cow", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  registration_number: text("registration_number").notNull(),
  breed: text("breed").notNull(),
  greutate: text("greutate").notNull(),
  stareSanatate: text("stare_sanatate").notNull(),
  sex: text("sex").notNull(),
  nrMatricolTata: text("nr_matricol_tata").notNull(),
  nrMatricolMama: text("nr_matricol_mama").notNull(),
  nrAutorizatie: text("nr_autorizatie"),
  dataExpirareAutorizatie: date("data_expirare_autorizatie"),
  dataIntrareFerma: date("data_intrare_ferma").notNull(),
  culoare: text("culoare").notNull(),
  poza: text("poza").notNull(),
});
