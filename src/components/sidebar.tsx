import { useContext, type FC } from "react";
import { AppContext } from "@/context/appContext";
import type { ShapeVarient } from "@/types";
import { Shape } from "./shape";

export const Sidebar: FC = () => {
  const appContext = useContext(AppContext);

  if (!appContext?.appShapes) return null;
  return (
    <div className="app-sidebar">
      {Object.entries(appContext?.appShapes).map(([shape]) => (
        <Shape variant={shape as ShapeVarient} />
      ))}
    </div>
  );
};
