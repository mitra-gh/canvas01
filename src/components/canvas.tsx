import { useContext, useRef, type FC, type MouseEventHandler } from "react";
import { AppContext } from "@/context/appContext";
import { Shape } from "./shape";

const SHPE_SIZE = 100;

export const Canvas: FC = () => {
  const appContext = useContext(AppContext);
  const canvasRef = useRef<HTMLElement>(null);

  const onClickHandler: MouseEventHandler<HTMLElement> = (e) => {
    if (appContext?.selectedTool && canvasRef.current) {
      const { x: canvasX, y: canvasY } =
        canvasRef.current.getBoundingClientRect();

      //console.log("hey:", e.clientX, e.clientY, canvasX, canvasY);

      appContext?.dispatch({
        type: "ADD_TO_CANVAS",
        payload: {
          canvasShape: {
            id: `${appContext?.selectedTool}-${
              appContext.canvasShapes.length + 1
            }`,
            varient: appContext?.selectedTool,
            x: e.clientX - canvasX - SHPE_SIZE / 2,
            y: e.clientY - canvasY - SHPE_SIZE / 2,
          },
        },
      });

      appContext?.dispatch({
        type: "CHANGE_SHAPE_NUM",
        payload: {
          shape: appContext?.selectedTool,
          number:
            appContext.canvasShapes.filter(
              (canvasShape) => canvasShape.varient === appContext?.selectedTool
            ).length + 1,
        },
      });

      appContext?.dispatch({
        type: "CHANGE_TOOL",
        payload: { tool: undefined },
      });
    }
    return;
  };

  return (
    <main
      id="canvas-area"
      className="canvas"
      ref={canvasRef}
      onClick={onClickHandler}
    >
      {!!appContext?.canvasShapes &&
        appContext?.canvasShapes.length > 0 &&
        appContext?.canvasShapes.map((canvasShape) => (
          <Shape
            id={canvasShape.id}
            variant={canvasShape.varient}
            style={{ left: canvasShape.x, top: canvasShape.y }}
            isInCanvas
          />
        ))}
    </main>
  );
};
