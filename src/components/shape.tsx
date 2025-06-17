import { useContext, type CSSProperties, type FC } from "react";
import { Circle, Square, Triangle } from "lucide-react";
import { AppContext } from "@/context/appContext";
import type { ShapeVarient } from "@/types";

type Props = {
  variant: ShapeVarient;
  id?: string;
  isInCanvas?: boolean;
  style?: CSSProperties;
};

export const Shape: FC<Props> = ({
  id,
  variant,
  style,
  isInCanvas = false,
}) => {
  const appContext = useContext(AppContext);

  const onRemoveShape = () => {
    if (!isInCanvas) return;

    //console.log("shape fpr remove:", id);

    appContext?.dispatch({
      type: "REMOVE_FROM_CANVAS",
      payload: { canvasShapeId: id as string },
    });

    appContext?.dispatch({
      type: "CHANGE_SHAPE_NUM",
      payload: {
        shape: variant,
        number:
          appContext.canvasShapes.filter(
            (canvasShape) => canvasShape.varient === variant
          ).length - 1,
      },
    });
  };

  const onSelectTool = () => {
    //console.log("select tool");
    if (isInCanvas) return;

    appContext?.dispatch({
      type: "CHANGE_TOOL",
      payload: { tool: variant },
    });
  };

  const getShape = (name: ShapeVarient) => {
    switch (name) {
      case "circle":
        return (
          <Circle width={"100%"} height={"100%"} fill="red" stroke="red" />
        );
      case "square":
        return (
          <Square width={"100%"} height={"100%"} fill="blue" stroke="blue" />
        );
      case "triangle":
        return (
          <Triangle
            width={"100%"}
            height={"100%"}
            fill="green"
            stroke="green"
          />
        );
    }
  };
  return (
    <div
      id={id}
      style={style}
      className={`shape-wrapper ${isInCanvas ? "in-canvas" : ""}`}
      onClick={onSelectTool}
      onDoubleClick={onRemoveShape}
    >
      {getShape(variant)}
    </div>
  );
};
