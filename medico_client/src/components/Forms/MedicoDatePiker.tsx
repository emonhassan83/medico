import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDatePikerProps = {
  name: string;
  label?: string;
  width?: string;
};

const MedicoDatePiker = ({
  name,
  label
}: TDatePikerProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label} style={{ width: "100%", marginBottom: "5px" }}>
          <DatePicker {...field} size="middle" style={{ width: "100%" }} />
        </Form.Item>
      )}
    />
  );
};

export default MedicoDatePiker;
