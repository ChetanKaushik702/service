import React from "react";
import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="grid h-screen w-screen max-w-full place-items-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
};

export default Loader;
