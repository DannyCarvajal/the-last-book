"use client";

import { useEffect, useState } from "react";

function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(initialState);
  }, []);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}

export default useDisclosure;
