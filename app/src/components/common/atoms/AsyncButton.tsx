import { Button, ButtonProps } from "antd";
import { useState } from "react";

export default function AsyncButton(props: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (props.onClick) {
      setIsLoading(true);
      // クリック処理を同期実行する
      await props.onClick(event);
      setIsLoading(false);
    }
  };
  return (
    <Button {...props} onClick={onClick} loading={isLoading}>
      {props.children}
    </Button>
  );
}
