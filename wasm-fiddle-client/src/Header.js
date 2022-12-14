import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Logo from "./logo.png";

export default function Header() {

    const [openAbout, setOpenAbout] = React.useState(false);
    const [openQuestion, setOpenQuestion] = React.useState(false);
    const [openWidget, setOpenWidget] = React.useState(false);

    const toggleAboutState = () => {
        setOpenAbout(!openAbout);
    };
    const toggleQuestionState = () => {
        setOpenQuestion(!openQuestion);
    }
    const toggleWidgetState = () => {
      setOpenWidget(!openWidget);
    }

  return (
      <AppBar position="static">
        <Toolbar data-cy='headerHeader'>
          <img src={Logo} alt="logo" width="50" height="50" border="2"/>
          <Typography variant="h4" 
            component="div" sx={{ flexGrow: 1, ml: 2 }}>
            WasmFiddle
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="question"
            sx={{ mr: 2}}
            onClick={toggleQuestionState}
            data-cy="headerQuestionButton"
          >
            <HelpOutlineIcon/>
            <Dialog open={openQuestion}>
                <DialogTitle data-cy="headerQuestionDialogTitle">How to use the project</DialogTitle>
                <DialogContent data-cy="headerQuestionDialogContent">
                    First, choose a language between C, C++ and Rust to enter into the input box.
                    Then, enter valid code in that language and click build followed by run. Your
                    code will be compiled and the result will be displayed to you in the output box.
                    Happy coding!
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleQuestionState} color="inherit" data-cy="headerQuestionDialogClose">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="info"
            sx={{ mr: 2}}
            onClick={toggleAboutState}
            data-cy="headerAboutButton"
          >
            <InfoOutlinedIcon/>
            <Dialog open={openAbout}>
                <DialogTitle data-cy="headerAboutDialogTitle">About the project</DialogTitle>
                <DialogContent data-cy="headerAboutDialogContent">
                    This project was developed as part of the Capstone project for the
                    BS in Computer Science at Oregon State University. It functions as a
                    WebAssembly equivalent to JSFiddle as it allows them to write and edit
                    C, C++, or Rust code in the browser and then see the output of it in the
                    browser as well. 
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleAboutState} color="inherit" data-cy="headerAboutDialogClose">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="widget"
            sx={{ mr: 2}}
            onClick={toggleWidgetState}
            data-cy="headerWidgetButton"
          >
              <WidgetsOutlinedIcon/>
              <Dialog open={openWidget}>
                <DialogTitle data-cy="headerWidgetDialogTitle">Embedable Widget</DialogTitle>
                <DialogContent>
                  <iframe src="https://capstonewasmfiddle.github.io/" height="600" width="400" title="Widget"></iframe>
                </DialogContent>
                <DialogActions>
                  <Button onClick={toggleWidgetState} color="inherit" data-cy="headerWidgetDialogClose">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>

          </IconButton>
        </Toolbar>
      </AppBar>
  );
}