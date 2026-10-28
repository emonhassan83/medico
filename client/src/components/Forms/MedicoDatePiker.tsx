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
        <Form.Item style={{ width: "100%"}}>
          <p className="block text-sm font-medium text-gray-700" style={{ marginBottom: "5px"}}>{label ? label : null}</p>
          <DatePicker {...field} size="large" style={{ width: "100%" }} />
        </Form.Item>
      )}
    />
  );
};

export default MedicoDatePiker;
