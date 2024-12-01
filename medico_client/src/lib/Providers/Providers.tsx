'use client';

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ConfigProvider } from "antd";
import { theme } from "../theme/theme";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </Provider>
  );
};

export default Providers;