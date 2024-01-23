import { type PropsWithChildren, type FC } from "react";

type HeaderProps = PropsWithChildren<{
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}>;

const Header: FC<HeaderProps> = function ({ children, as }) {
  const Heading = as;

  return <Heading style={{ marginBlock: `3rem` }}>{children}</Heading>;
};

export default Header;
