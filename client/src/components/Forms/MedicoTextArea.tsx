import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";

type TInputProps = {
  rows?: number;
  name: string;
  label?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  width?: string;
};

const MedicoTextArea = ({
  rows = 3,
  name,
  label,
  placeholder,
  style,
  width = "100%",
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "7px", ...style }}>
      <p style={{ marginBottom: "5px" }}>{label ? label : null}</p>
      <Controller
        name={name}
        render={({ field }) => (
          <TextArea
            style={{ width }}
            id={name}
            rows={rows}
            placeholder={placeholder}
            {...field}
          />
        )}
      />
    </div>
  );
};

export default MedicoTextArea;
