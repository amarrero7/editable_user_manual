"use client";

import { TinaCMS, TinaProvider as Tina } from "tinacms";
import { useState } from "react";

export default function TinaProvider({ children }: { children: React.ReactNode }) {
  const [cms] = useState(() => new TinaCMS({
    enabled: true,
  }));

  return <Tina cms={cms}>{children}</Tina>;
}
