import { createContext, useReducer, type FC, type ReactNode } from "react";
import { appReducer } from "@/reducer/appReducer";
import type { AppContextProps } from "@/types";

type Props = {
  children: ReactNode;
};

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppContextProvider: FC<Props> = ({ children }) => {
  const [appStates, dispatch] = useReducer(appReducer, {
    appTitle: "Untiteld",
    appShapes: {
      circle: 0,
      square: 0,
      triangle: 0,
    },
    selectedTool: undefined,
    canvasShapes: [],
  });

  return (
    <AppContext.Provider
      value={{
        appTitle: appStates.appTitle,
        appShapes: appStates.appShapes,
        selectedTool: appStates.selectedTool,
        canvasShapes: appStates.canvasShapes,
        dispatch: dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
