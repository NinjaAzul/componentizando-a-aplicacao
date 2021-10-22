import "./styles/global.scss";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import {CategoryProvider} from "./contexts/CategoryContext";

export function App() {
  return (
    <CategoryProvider>
    <div style={{ display: "flex", flexDirection: "row" }}>
     
      <SideBar />
      <Content />
  
    </div>
    </CategoryProvider>
  );
}
