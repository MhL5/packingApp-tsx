import { PropsWithChildren, type FC } from "react";

const Header: FC<
  PropsWithChildren<{ as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }>
> = function ({ children, as }) {
  const Heading = as;

  return <Heading>{children}</Heading>;
};

export default Header;
