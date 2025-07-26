import React, { createContext, PropsWithChildren, useState } from "react";
import { Toast } from "../components/ui/Toast/Toast";

type ToastVariant = "default" | "error" | "warning" | "success";
type ToastPosition = "top" | "bottom";

type ToastOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  position?: ToastPosition;
  duration?: number;
};

type ToastContextType = {
  showToast: (options: ToastOptions) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toast, setToast] = useState<ToastOptions | null>(null);

  const showToast = (options: ToastOptions) => {
    const position = options.position || "bottom";
    const duration = options.duration ?? 3000;

    setToast({
      ...options,
      variant: options.variant || "default",
      position,
      duration,
    });
  };

  const Test = () => {
    if (!toast) {
      return null;
    } else {
      return (
        <Toast
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          position={toast.position}
          duration={toast.duration}
        />
      );
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Test />
    </ToastContext.Provider>
  );
};
