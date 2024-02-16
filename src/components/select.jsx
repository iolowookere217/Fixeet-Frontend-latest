import { Select, FormControl, FormLabel } from "@chakra-ui/react";
import { forwardRef } from "react";

const AppSelect = forwardRef(
  (
    {
      placeholder,
      optionList,
      size = "sm",
      width = "12rem",
      label,
      name,
      isRequired,
      ...rest
    },
    ref
  ) => {
    return (
      <FormControl
        className="flex flex-col w-full"
        maxHeight="5rem"
        w={width}
        isRequired={isRequired}
      >
        {label && (
          <FormLabel
            htmlFor={name}
            color="typography.label"
            fontSize="1rem"
            fontWeight={300}
          >
            {label}
          </FormLabel>
        )}
        <Select
          placeholder={placeholder}
          size={size}
          bgColor="white"
          border="1px solid #D4D4D4"
          borderRadius=".35rem"
          {...rest}
          ref={ref}
        >
          {optionList.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormControl>
    );
  }
);

AppSelect.displayName = "AppSelect";

export default AppSelect;
