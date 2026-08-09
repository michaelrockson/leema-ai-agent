import { useState } from "react";

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  return { isDark, setIsDark };
}
