import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "./Root";
import Coins from "./pages/Coins";
import Coin from "./pages/Coin";
import Chart from "./components/Chart";
import Price from "./components/Price";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "",
            loader: () => redirect("chart"),
          },
          {
            path: "chart",
            element: <Chart />,
          },
          {
            path: "price",
            element: <Price />,
          },
        ],
      },
    ],
  },
]);

export default router;
