import { useState } from "react";
import RegisterForm from "./components/RegisterForm";
import { SummaryModal } from "./components/SummaryModal";

function App() {
  const [data, setData] = useState(null);

  return (
    <>
      {data === null ? (
        <RegisterForm setData={setData} />
      ) : (
        <SummaryModal data={data} />
      )}
    </>
  );
}

export default App;
