import { Suspense } from "react";
import TilesClient from "./TilesClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TilesClient />
    </Suspense>
  );
}