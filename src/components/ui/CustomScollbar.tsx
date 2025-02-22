import React from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
interface CustomScrollbarProps {
  children: React.ReactNode;
  maxWidth?: string;
  maxHeight?: string;
}
const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  children,
  maxWidth,
  maxHeight,
}) => {
  return (
    <SimpleBar style={{ maxHeight: maxHeight, maxWidth: maxWidth }}>
      {children}
    </SimpleBar>
  );
};

export default CustomScrollbar;
