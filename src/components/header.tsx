import {
  useContext,
  useRef,
  useState,
  type ChangeEventHandler,
  type FC,
} from "react";
import { AppContext } from "@/context/appContext";
import type { ConfigJson } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Header: FC = () => {
  const appContext = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [val, setVal] = useState(appContext?.appTitle);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportJSON = (exportData: ConfigJson) => {
    const jsonData = JSON.stringify(exportData);
    const jsonBlob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "canvas-config.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const parsedData = e?.target?.result
            ? (JSON.parse(e.target.result as string) as ConfigJson)
            : null;
          if (parsedData) {
            appContext?.dispatch({
              type: "IMPORT_CONFIG",
              payload: {
                title: parsedData.appTitle,
                shapeList: parsedData.canvasShapes,
              },
            });
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };

      reader.readAsText(selectedFile);
    }
  };

  const onImportClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const onExportClick = () => {
    if (appContext?.appTitle && appContext?.canvasShapes)
      exportJSON({
        appTitle: appContext?.appTitle,
        canvasShapes: appContext?.canvasShapes,
      });
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setVal(e.target.value);
  };

  const onSaveClick = () => {
    appContext?.dispatch({
      type: "CHANGE_TITLE",
      payload: { title: val as string },
    });
    setIsEdit(false);
  };

  return (
    <header className="app-header">
      <div className="header-right-side">
        <Button onClick={onImportClick}>
          Import
          <input
            ref={fileInputRef}
            onChange={handleFileChange}
            type="file"
            hidden
            accept="application/json"
          ></input>
        </Button>
        <Button onClick={onExportClick}>Export</Button>
      </div>
      <div className="header-left-side">
        {isEdit && (
          <>
            <Button onClick={onSaveClick}>save</Button>
            <Input
              defaultValue={appContext?.appTitle}
              style={{ direction: "ltr" }}
              value={val}
              onChange={onInputChange}
            ></Input>
          </>
        )}
        {!isEdit && (
          <Button
            variant="ghost"
            className="app-title"
            onClick={() => setIsEdit(true)}
          >
            {appContext?.appTitle}
          </Button>
        )}
      </div>
    </header>
  );
};
