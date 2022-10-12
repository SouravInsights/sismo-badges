import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

export default function Pages(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
