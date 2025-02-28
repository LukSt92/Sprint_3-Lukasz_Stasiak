import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@mui/material/styles";
import * as z from "zod";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";

const techToLearn = ["React", "HTML", "CSS", "Node.js", "Next.js"];
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

const registerSchema = z.object({
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
  technology: z.any(),
  image: z.any().refine((file) => imageTypes.includes(file[0]?.type), {
    message: "Przesyłane CV musi być w formacie: JPEG lub PNG.",
  }),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { coursePreferency: "online" },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      style={{ backgroundColor: "brown" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 style={{ color: "green" }}>Dane osobowe</h3>
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
      <h3 style={{ color: "green" }}>Preferencje kursu</h3>
      <RadioGroup row>
        <p>Wybierz formę nauki:</p>
        <FormControlLabel
          {...register("coursePreferency")}
          value="stacjonarnie"
          control={<Radio />}
          label="Stacjonarnie"
        />
        <FormControlLabel
          {...register("coursePreferency")}
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
      <h3 style={{ color: "green" }}>Dodaj swoje CV</h3>
      <Button component="label" variant="outlined">
        Wybierz plik
        <VisuallyHiddenInput {...register("image")} type="file" />
      </Button>
      {errors?.image && <p>{errors.image.message}</p>}
      <Button variant="contained" type="submit">
        Wyślij zgłoszenie
      </Button>
    </form>
  );
};

export default RegisterForm;
