import { useState } from "react";
import { useLocation } from "react-router";

export function useModal(defaultState = false) {
  const [isVisible, SetIsVisible] = useState(defaultState);
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

/**
 *
 * @description クエリパラメータの検索を行う
 */
export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
