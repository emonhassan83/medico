import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  width?: string;
};

const ReusableSelect = ({
  label,
  name,
  options,
  disabled,
  mode,
  width = "100%",
}: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item style={{ width: "100%" }} label={label}>
          <Select
            mode={mode}
            style={{ width }}
            {...field}
            options={options}
            size="middle"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default ReusableSelect;
