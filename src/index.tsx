import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";
import RouteIndex from "./route-index";

import "./styles.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <h1>活动页 演示</h1>
        <h2>商城活動, 創建, 維護, 展示, 技術演示.</h2>
        <p>商城活動: 簡稱活動, gmall-activities, 單數 activity.</p>
      </div>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/activities">活動列表</Link>
          </li>
          <li>
            <Link to="/create-activity">創建活動</Link>
          </li>
          <li>
            <Link to="/test">Test Page</Link>
          </li>
        </ul>

        <hr />

        <RouteIndex />
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
