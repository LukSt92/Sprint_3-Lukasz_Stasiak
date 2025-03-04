import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "../schemas/registerSchema";
import { techToLearn, expYears, initialExperience } from "../data/data";
import { styled } from "@mui/material/styles";
import {
  MenuItem,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  Checkbox,
  Stack,
} from "@mui/material";

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
const StyledOption = styled("option")({
  color: "#ffffffde",
});
const StyledTextField = styled(TextField)({
  input: {
    color: "#ffffffde",
  },
  label: {
    color: "#ffffffde",
  },
});
const StyledSelect = styled(Select)({
  color: "#ffffffde",
});

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
        <StyledTextField
          {...register("name")}
          id="name"
          label="Imię"
          type="name"
          error={errors.name}
          helperText={errors.name ? errors.name.message : ""}
        />
        <StyledTextField
          {...register("lastName")}
          id="lastName"
          label="Nazwisko"
          type="lastName"
          error={errors.lastName}
          helperText={errors.lastName ? errors.lastName.message : ""}
        />
        <StyledTextField
          {...register("email")}
          id="email"
          label="E-mail"
          type="email"
          error={errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />
        <StyledTextField
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
            <StyledOption key={technology} value={technology}>
              {technology}
            </StyledOption>
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
                  <StyledSelect
                    {...register(`experiences.${index}.name`)}
                    defaultValue={techToLearn[0]}
                    sx={{ width: "33%" }}
                  >
                    {techToLearn.map((technology) => (
                      <MenuItem key={technology} value={technology}>
                        {technology}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                  <StyledSelect
                    {...register(`experiences.${index}.years`)}
                    defaultValue={expYears[0]}
                    sx={{ width: "33%" }}
                  >
                    {expYears.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => remove(index)}
                    sx={{ width: "33%" }}
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
