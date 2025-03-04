import * as z from "zod";
import experienceSchema from "./experienceSchema";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Imię musi składać się conajmniej z 3 znaków." }),
    lastName: z
      .string()
      .min(3, { message: "Nazwisko musi składać się conajmniej z 3 znaków." }),
    email: z.string().email({ message: "Niepoprawny adres email" }),
    telNumber: z
      .string()
      .min(9, { message: "Numer telefonu musi składać się z 9 cyfr." })
      .max(9, { message: "Numer telefonu musi składać się z 9 cyfr." }),
    coursePreferency: z.any(),
    technology: z
      .string()
      .array()
      .min(1, { message: "Prosze wybrać conajmniej jedną technologie" }),
    image: z
      .any()
      .refine((file) => ["image/jpeg", "image/png"].includes(file[0]?.type), {
        message: "Przesyłane CV musi być w formacie: JPEG lub PNG.",
      }),
    isExp: z.any().optional(),
    experiences: z.array(experienceSchema).optional(),
  })
  .superRefine(({ isExp, experiences }, ctx) => {
    if (isExp === "true" && experiences.length === 0) {
      ctx.addIssue({
        path: ["isExp"],
        code: z.ZodIssueCode.custom,
        message:
          "Gdy zaznaczono doświadczenie w programowaniu, lista doświadczeń nie może być pusta.",
      });
    }
  });

export default registerSchema;
