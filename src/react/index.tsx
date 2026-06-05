import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import GodsightPanel from "./app";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <GodsightPanel />
  </StrictMode>
);