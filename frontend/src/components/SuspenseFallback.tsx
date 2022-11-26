import { Center, Loader } from "@mantine/core";
import { ReactNode, Suspense } from "react";

interface SuspenseFallbackProps {
  children: ReactNode;
}

export const SuspenseFallback = ({ children }: SuspenseFallbackProps) => {
  return (
    <Suspense
      fallback={
        <Center style={{ height: "100%" }}>
          <Loader />
        </Center>
      }
    >
      {children}
    </Suspense>
  );
};
