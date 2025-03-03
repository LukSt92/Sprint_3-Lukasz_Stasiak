import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@mui/material/styles";
import * as z from "zod";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { MenuItem } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const techToLearn = ["React", "HTML", "CSS", "Node.js", "Next.js"];
const expYears = ["1", "2", "3", "4", "5"];
const imageTypes = ["image/jpeg", "image/png"];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const StyledH3 = styled("h3")({
  color: "#FF5733",
  fontWeight: "bold",
  fontSize: "24px",
});

const StyledError = styled("p")({
  color: "#d32f2f",
  fontSize: "14px",
  fontFamily: "Roboto",
});

const StyledForm = styled("form")({
  backgroundColor: "#404040",
  width: "40vh",
  padding: "16px",
  borderRadius: "8px",
});

const experienceSchema = z.object({
  id: z.string(),
  name: z.string(),
  years: z.string(),
});

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
    image: z.any().refine((file) => imageTypes.includes(file[0]?.type), {
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

const initialExperience = { name: "React", years: "1", id: "" };

const RegisterForm = ({ setData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });
  const [isExp, setIsExp] = useState(false);
  const { fields, append, remove } = useFieldArray({
    name: "experiences",
    control,
  });

  const onSubmit = (data) => {
    setData(data);
  };
  const handleCheckbox = () =>
    isExp === false ? setIsExp(true) : setIsExp(false);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <StyledH3>Dane osobowe</StyledH3>
        <TextField
          {...register("name")}
          id="name"
          label="Imię"
          type="name"
          error={errors.name}
          helperText={errors.name ? errors.name.message : ""}
        />
        <TextField
          {...register("lastName")}
          id="lastName"
          label="Nazwisko"
          type="lastName"
          error={errors.lastName}
          helperText={errors.lastName ? errors.lastName.message : ""}
        />
        <TextField
          {...register("email")}
          id="email"
          label="E-mail"
          type="email"
          error={errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />
        <TextField
          {...register("telNumber")}
          id="telNumber"
          label="Numer Telefonu"
          type="number"
          error={errors.telNumber}
          helperText={errors.telNumber ? errors.telNumber.message : ""}
        />
        <StyledH3>Preferencje kursu</StyledH3>
        <RadioGroup row defaultValue="online">
          <p>Wybierz formę nauki:</p>
          <FormControlLabel
            {...register("coursePreferency")}
            name="coursePreferency"
            value="stacjonarnie"
            control={<Radio />}
            label="Stacjonarnie"
          />
          <FormControlLabel
            {...register("coursePreferency")}
            name="coursePreferency"
            value="online"
            control={<Radio />}
            label="Online"
          />
        </RadioGroup>
        <Select {...register("technology")} multiple native>
          {techToLearn.map((technology) => (
            <option key={technology} value={technology}>
              {technology}
            </option>
          ))}
        </Select>
        {errors?.technology && (
          <StyledError>{errors.technology.message}</StyledError>
        )}
        <StyledH3>Dodaj swoje CV</StyledH3>
        <Button component="label" variant="outlined">
          Wybierz plik
          <VisuallyHiddenInput {...register("image")} type="file" />
        </Button>
        {errors?.image && <StyledError>{errors.image.message}</StyledError>}
        <StyledH3>Doświadczenie w programowaniu</StyledH3>
        <FormControlLabel
          {...register("isExp")}
          control={<Checkbox />}
          label="Czy masz doświadczenie w programowaniu?"
          value={isExp}
          onChange={handleCheckbox}
        />
        {isExp && (
          <Stack spacing={1}>
            <Button
              variant="contained"
              color="success"
              onClick={() => append(initialExperience)}
            >
              Dodaj doświadczenie
            </Button>
            {fields.map(({ id }, index) => {
              setValue(`experiences.${index}.id`, id);
              return (
                <Stack direction="row" spacing={1} key={id}>
                  <Select
                    {...register(`experiences.${index}.name`)}
                    defaultValue={techToLearn[0]}
                  >
                    {techToLearn.map((technology) => (
                      <MenuItem key={technology} value={technology}>
                        {technology}
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    {...register(`experiences.${index}.years`)}
                    defaultValue={expYears[0]}
                  >
                    {expYears.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => remove(index)}
                  >
                    Usuń
                  </Button>
                </Stack>
              );
            })}
          </Stack>
        )}
        {errors?.isExp && <StyledError>{errors.isExp.message}</StyledError>}
        <Button variant="contained" type="submit">
          Wyślij zgłoszenie
        </Button>
      </Stack>
    </StyledForm>
  );
};

export default RegisterForm;
