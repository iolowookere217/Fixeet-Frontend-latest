import { Button } from "@chakra-ui/react";
import customTheme from "@/utils/theme";
import { Link } from "react-router-dom";

const AppButton = ({
  children,
  type,
  variant = "primary",
  width = "full",
  height = "2.7rem",
  bRadius = "0.25rem",
  loading,
  style,
  disabled,
  to,
  ...props
}) => {
  const { colors } = customTheme;
  return (
    <Button
      as={to ? Link : undefined}
      to={to}
      type={type}
      variant={variant}
      width={width}
      height={height}
      borderRadius={bRadius}
      isLoading={loading}
      isDisabled={disabled}
      fontWeight="normal"
      style={style}
      fontSize="1rem"
      bg={
        variant === "primary"
          ? colors.brand.main
          : variant === "secondary"
            ? colors.brand.secondary
            : variant === "tertiary"
              ? colors.brand.tertiary
              : variant === "dark"
                ? colors.bg.green
                : "transparent"
      }
      color={
        variant === "primary"
          ? "white"
          : variant === "secondary"
            ? "white"
            : variant === "tertiary"
              ? colors.typography.white
              : variant === "dark"
                ? "white"
                : colors.typography.dark
      }
      _hover={{
        opacity: 0.8,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AppButton;
