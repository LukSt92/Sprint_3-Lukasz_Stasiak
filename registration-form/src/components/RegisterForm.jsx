import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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

const techToLearn = ["React", "HTML", "CSS", "Node.js", "Next.js"];

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

  const [radioValue, setRadioValue] = useState("online");
  const [selectValue, setSelectValue] = useState([]);

  const handleSelectChange = (e) => {
    const { options } = e.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectValue(value);
  };

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
    console.log(radioValue);
    console.log(selectValue);
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
      <RadioGroup
        row
        name="controlled-radio-buttons-group"
        value={radioValue}
        onChange={handleRadioChange}
      >
        <p>Wybierz formę nauki:</p>
        <FormControlLabel
          value="stacjonarnie"
          control={<Radio />}
          label="Stacjonarnie"
        />
        <FormControlLabel value="online" control={<Radio />} label="Online" />
      </RadioGroup>
      <Select multiple native value={selectValue} onChange={handleSelectChange}>
        {techToLearn.map((technology) => (
          <option key={technology} value={technology}>
            {technology}
          </option>
        ))}
      </Select>
      <Button variant="contained" type="submit">
        Wyślij zgłoszenie
      </Button>
    </form>
  );
};

export default RegisterForm;
