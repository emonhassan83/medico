import { Spin } from "antd";

const FullPageLoading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f2f5",
    }}
  >
    <Spin size="large" tip="Please wait, loading content..." />
  </div>
);
export default FullPageLoading;
