import React from "react";
import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";

const StyledH3 = styled("h3")({
  color: "#FF5733",
  fontWeight: "bold",
  fontSize: "24px",
});

export const SummaryModal = ({ data }) => {
  const imageUrl = URL.createObjectURL(data.image[0]);

  return (
    <Stack spacing={2}>
      <StyledH3>Dane osobowe</StyledH3>
      <p>Imię: {data.name}</p>
      <p>Nazwisko: {data.lastName}</p>
      <p>Email: {data.email}</p>
      <p>Numer telefonu: {data.telNumber}</p>
      {data.experiences.length > 0 && (
        <div>
          <StyledH3>Doświadczenie w programowaniu</StyledH3>
          {data.experiences.map((exp) => (
            <p>
              Technologia: {exp.name} / poziom: {exp.years}
            </p>
          ))}
        </div>
      )}

      <StyledH3>Preferencje kursu</StyledH3>
      <p>Forma nauki: {data.coursePreferency}</p>
      <p>Preferowane technologie:</p>
      <ul>
        {data.technology.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <StyledH3>Curriculum Vitae</StyledH3>
      <img src={imageUrl}></img>
    </Stack>
  );
};
