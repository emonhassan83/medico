import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  color?: string;
  label?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  width?: string;
};

const MedicoInput = ({
  type,
  name,
  label,
  placeholder,
  color,
  style,
  width = "100%",
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "7px", ...style }}>
      <p className="block text-sm font-medium text-gray-700" style={{ marginBottom: "5px", color }}>{label ? label : null}</p>
      <Controller
        name={name}
        render={({ field }) => (
          <input
            className="mt-1 w-full rounded-md outline-none border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            style={{ width }}
            type={type}
            id={name}
            placeholder={placeholder}
            {...field}
          />
        )}
      />
    </div>
  );
};

export default MedicoInput;
