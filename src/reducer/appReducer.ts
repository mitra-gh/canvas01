import type { ShapeVarient, CanvasShape, InitialState } from "@/types";

type ChangeTitleAction = {
  type: "CHANGE_TITLE";
  payload: {
    title: string;
  };
};

type ChangeShapeNumberAction = {
  type: "CHANGE_SHAPE_NUM";
  payload: {
    shape: ShapeVarient;
    number: number;
  };
};

type ChangeToolAction = {
  type: "CHANGE_TOOL";
  payload: {
    tool: ShapeVarient | undefined;
  };
};

type AddToCanvasAction = {
  type: "ADD_TO_CANVAS";
  payload: {
    canvasShape: CanvasShape;
  };
};

type RemoveFromCanvasAction = {
  type: "REMOVE_FROM_CANVAS";
  payload: {
    canvasShapeId: string;
  };
};

type ImportConfigAction = {
  type: "IMPORT_CONFIG";
  payload: {
    title: string;
    shapeList: CanvasShape[];
  };
};

export type ReducerActions =
  | ChangeTitleAction
  | ChangeShapeNumberAction
  | ChangeToolAction
  | RemoveFromCanvasAction
  | AddToCanvasAction
  | ImportConfigAction;

export const appReducer = (prevState: InitialState, action: ReducerActions) => {
  switch (action.type) {
    case "CHANGE_TITLE":
      return {
        ...prevState,
        appTitle: action.payload.title,
      };
    case "CHANGE_SHAPE_NUM":
      return {
        ...prevState,
        appShapes: {
          ...prevState.appShapes,
          [action.payload.shape]: action.payload.number,
        },
      };
    case "CHANGE_TOOL":
      return {
        ...prevState,
        selectedTool: action.payload.tool,
      };
    case "REMOVE_FROM_CANVAS": {
      const updatedCanvas = prevState.canvasShapes.filter(
        (shape) => shape.id !== action.payload.canvasShapeId
      );
      return {
        ...prevState,
        canvasShapes: updatedCanvas,
      };
    }
    case "ADD_TO_CANVAS":
      return {
        ...prevState,
        canvasShapes: [...prevState.canvasShapes, action.payload.canvasShape],
      };
    case "IMPORT_CONFIG":
      return {
        ...prevState,
        appTitle: action.payload.title,
        canvasShapes: action.payload.shapeList,
        selectedTool: undefined,
        appShapes: {
          circle:
            action.payload.shapeList.filter((s) => s.varient === "circle")
              .length || 0,
          square:
            action.payload.shapeList.filter((s) => s.varient === "square")
              .length || 0,
          triangle:
            action.payload.shapeList.filter((s) => s.varient === "triangle")
              .length || 0,
        },
      };
    default:
      return prevState;
  }
};
