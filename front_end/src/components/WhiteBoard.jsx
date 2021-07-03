import React, { Fragment, useRef, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import CanvasDraw from "react-canvas-draw";
import UndoIcon from "@material-ui/icons/Undo";
import DeleteIcon from "@material-ui/icons/Delete";
import localClasses from "./WhiteBoard.module.css";
import { ChromePicker } from "react-color";
import ColorLensIcon from "@material-ui/icons/ColorLens";

const WhiteBoard = (props) => {
  const saveableCanvas = useRef(CanvasDraw);
  const [displayColorPicker, setdisplayColorPicker] = useState(false);
  const [brushColor, setBrushColor] = useState("#000A29");
  const popover = {
    position: "absolute",
    zIndex: "100",
    left: "-50px",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  const handleColorChange = (color) => {
    setBrushColor(color.hex);
    // setdisplayColorPicker(false);
  };

  const handleColorOpen = () => {
    setdisplayColorPicker(true);
  };

  const handleColorClose = () => {
    setdisplayColorPicker(false);
  };

  return (
    <Fragment>
      <AppBar position="static" style={{ backgroundColor: "#000A29" }}>
        <div className={localClasses.Editor__navbar}>
          <Typography
            variant="h5"
            style={{
              fontFamily: "poppins",
              color: "white",
              marginRight: "auto",
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "30px",
              fontWeight: "800",
            }}
          >
            &nbsp;White<span style={{ color: "#FFD500" }}>Board</span>
          </Typography>
          <Toolbar>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleColorOpen}
                startIcon={<ColorLensIcon />}
                style={{
                  fontFamily: "poppins",
                  marginLeft: "auto",
                  fontWeight: "600",
                  color: "white",
                }}
              >
                Pick Color
              </Button>
              {displayColorPicker ? (
                <div style={popover}>
                  <div style={cover} onClick={handleColorClose} />
                  <ChromePicker
                    color={brushColor}
                    onChange={handleColorChange}
                  />
                </div>
              ) : null}
            </div>
          </Toolbar>
        </div>
      </AppBar>

      <CanvasDraw
        ref={saveableCanvas}
        canvasWidth={"auto"}
        canvasHeight={"548px"}
        brushRadius={3}
        brushColor={brushColor}
        catenaryColor={"#FFD500"}
        gridColor={"rgba(0, 180, 216, 0.1)"}
      />
      <AppBar position="static" style={{ backgroundColor: "#000A29" }}>
        <Toolbar>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              saveableCanvas.current.clear();
            }}
            startIcon={<DeleteIcon />}
            style={{
              fontFamily: "poppins",
              marginLeft: "auto",
              fontWeight: "600",
              color: "white",
            }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            startIcon={<UndoIcon />}
            style={{
              fontFamily: "poppins",
              marginLeft: "auto",
              fontWeight: "600",
              color: "white",
              backgroundColor: "#99A3CD",
            }}
            onClick={() => {
              saveableCanvas.current.undo();
            }}
          >
            Undo
          </Button>
          {/* <Button
              variant="contained"
              startIcon={<ShareIcon />}
              style={{
                fontFamily: "poppins",
                marginLeft: "auto",
                fontWeight: "600",
                color: "white",
                backgroundColor: "#99A3CD",
              }}
            >
              Share
            </Button> */}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default WhiteBoard;
