"use client";

import React from "react";
import Button, { ButtonProps } from "./Button";

type DestructiveButtonProps = Omit<ButtonProps, "variant">;

const DestructiveButton: React.FC<DestructiveButtonProps> = (props) => {
  return <Button variant="destructive" {...props} />;
};

export default DestructiveButton;
