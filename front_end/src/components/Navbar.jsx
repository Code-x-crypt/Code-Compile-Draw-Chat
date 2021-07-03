import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Typography, Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import Chat from "./Chat/Chat";
import copy from "copy-to-clipboard";

const Navbar = (props) => {
  const Copytext = (value) => {
    copy(value);
    alert("Copied Room ID : " + value);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#393b44" }}>
      <Toolbar>
        <Typography
          variant="h5"
          style={{ color: "white", fontFamily: "poppins", fontWeight: "800" }}
        >
          &nbsp;WhiteBoard<span style={{ color: "#FFD500" }}>Chat&Code</span>
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonIcon />}
          onClick={() => Copytext(props.roomId)}
          color="primary"
          style={{
            fontFamily: "poppins",
            marginLeft: "auto",
            fontWeight: "600",
            color: "white",
          }}
        >
          RoomId : {props.roomId}
        </Button>
        <Chat name={props.name} socket={props.socket} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
