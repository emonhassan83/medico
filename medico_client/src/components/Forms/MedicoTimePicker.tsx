import React from "react";
import { TimePicker } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

interface ITimePickerProps {
  name: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  size?: "large" | "middle" | "small";
}

const MedicoTimePicker = ({
  name,
  placeholder,
  label,
  required,
  fullWidth = true,
  size = "large",
}: ITimePickerProps) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: fullWidth ? "100%" : "auto",
      }}
    >
      {label && (
        <label
          style={{
            marginBottom: "8px",
            fontSize: "14px",
            color: isError ? "#ff4d4f" : "#000",
          }}
        >
          {label}
          {required && <span style={{ color: "#ff4d4f" }}> *</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={dayjs()}
        render={({ field: { onChange, value } }) => (
          <TimePicker
            value={value ? dayjs(value) : null}
            onChange={(time) => onChange(time)}
            placeholder={placeholder}
            size={size}
            style={{ width: fullWidth ? "100%" : "auto" }}
            status={isError ? "error" : ""}
          />
        )}
      />
      {isError && (
        <span style={{ color: "#ff4d4f", fontSize: "12px", marginTop: "4px" }}>
          {formState.errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default MedicoTimePicker;
