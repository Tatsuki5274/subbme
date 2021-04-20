import { useState } from "react";

export function useModal() {
  const [isVisible, SetIsVisible] = useState(false);
  const handleOpen = () => {
    SetIsVisible(true);
  };
  const handleClose = () => {
    SetIsVisible(false);
  };
  return {
    isVisible,
    handleOpen,
    handleClose,
  };
}
