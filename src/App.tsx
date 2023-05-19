import React, { lazy, Suspense } from "react";
import { Users } from "./components/templates";

const DeleteUserDialog = lazy(() => import("./components/templates/Users/DeleteUserDialog"));

function App() {
  return (
    <div>
      <Users />
      <Suspense>
        <DeleteUserDialog />
      </Suspense>
    </div>
  );
}

export default App;
