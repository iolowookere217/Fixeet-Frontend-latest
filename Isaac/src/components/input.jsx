import { useState, memo } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Input = memo(
  ({
    name,
    placeholder,
    type,
    autoComplete,
    disabled,
    style,
    label,
    value,
    ...props
  }) => {
    const [inputType, setInputType] = useState(type);

    const toggleInputType = () => {
      setInputType("text");
      setTimeout(() => {
        setInputType("password");
      }, 1000);
    };

    return (
      <div className="mb-2 flex flex-col gap-2">
        {label && (
          <label htmlFor={name} className="text-primary font-semibold">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <input
            type={inputType}
            id={name}
            // aria-invalid={errors[name] ? "true" : "false"}
            autoSave="true"
            autoCorrect="on"
            autoComplete={autoComplete}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full p-2 text-primary rounded-[0.25rem]  border border-[#a8a7a7] placeholder:text-text1 placeholder:text-xs lg:placeholder:text-base ${
              disabled === true ? "cursor-not-allowed" : "cursor-text"
            }`}
            value={value}
            style={style}
            {...props}
          />
          {type === "password" && (
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={toggleInputType}
            >
              {inputType === "password" ? (
                <AiOutlineEyeInvisible className="text-2xl text-slate-500" />
              ) : (
                <AiOutlineEye className="text-2xl text-slate-500" />
              )}
            </span>
          )}
        </div>
        {/* {errors[name] && (
          <span role="alert" className="text-xs text-[#FF0000] capitalize">
            {errors[name].message}
          </span>
        )} */}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
