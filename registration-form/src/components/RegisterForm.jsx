import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      style={{ backgroundColor: "white" }}
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

      <Button variant="contained" type="submit">
        Wyślij zgłoszenie
      </Button>
    </form>
  );
};

export default RegisterForm;
