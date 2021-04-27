import React from "react";
import { Button, ButtonProps } from "antd";
import { useState } from "react";

export default function AsyncButton(props: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (props.onClick) {
      setIsLoading(true);
      try {
        // クリック処理を同期実行する
        await props.onClick(event);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <Button {...props} onClick={onClick} loading={isLoading}>
      {props.children}
    </Button>
  );
}
