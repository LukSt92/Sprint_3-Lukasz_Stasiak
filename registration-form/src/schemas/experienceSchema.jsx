import * as z from "zod";

const experienceSchema = z.object({
  id: z.string(),
  name: z.string(),
  years: z.string(),
});

export default experienceSchema;
