import type { ActionDispatch } from "react";
import type { ReducerActions } from "@/reducer/appReducer";

export type ShapeVarient = "circle" | "square" | "triangle";

export type CanvasShape = {
  id: string;
  varient: ShapeVarient;
  x: number;
  y: number;
};

export type InitialState = {
  appTitle: string;
  appShapes: { [key in ShapeVarient]: number };
  selectedTool: ShapeVarient | undefined;
  canvasShapes: CanvasShape[];
};

export type ConfigJson = Pick<InitialState, "appTitle" | "canvasShapes">;

export type AppContextProps = InitialState & {
  dispatch: ActionDispatch<[action: ReducerActions]>;
};
