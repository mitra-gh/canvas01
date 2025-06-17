import { useContext, type FC } from "react";
import { AppContext } from "@/context/appContext";
import type { ShapeVarient } from "@/types";
import { Shape } from "./shape";

export const Footer: FC = () => {
  const appContext = useContext(AppContext);

  if (!appContext?.appShapes) return null;

  return (
    <footer className="app-footer">
      {Object.entries(appContext?.appShapes).map(([shape, number]) => (
        <div className="shape-data-wrapper">
          <Shape variant={shape as ShapeVarient} />
          <p>{number}</p>
        </div>
      ))}
    </footer>
  );
};
