import * as React from 'react';
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import CodeMirror from '@uiw/react-codemirror';
import DownloadIcon from '@mui/icons-material/Download';


export default function CodeEditor() {
    const [output, setOutput] = React.useState("Output will display here when ready!");
    const [build, setBuild] = React.useState(false);
    const [run, setRun] = React.useState(false);
    const [buildError, setBuildError] = React.useState(false);
    const [language, setLanguage] = React.useState("");
    const [compilation, setCompilation] = React.useState("");
    const onChange = React.useCallback((value, viewUpdate) => {
        console.log('value: ', value);
    }, []);
    
    const toggleBuildState = () => {
        if (language !== "wasm" && language !== "wat" && compilation !== ""){
            setBuildError(false);
            setBuild(!build);
        }
        else if (language === "wasm" || language === "wat"){
            setBuildError(false);
            setBuild(!build);
        }
        else {
            setBuildError(true);
        }
    }

    const toggleRunState = () => {
        if (build === true){
            setBuild(!build);
            setRun(!run);
        }
    }

    const handleLanguage = (event) => {
        setLanguage(event.target.value);
    }

    const handleCompilation = (event) => {
        setCompilation(event.target.value);
    }



    return (
        <>
            <Stack spacing={1} justifyContent="center" alignItems="center">
                {build === false && buildError === false &&
                    <Alert severity="info" sx={{ m: 1 }}>Choose a language and compilation option, enter your code, then click build and run!</Alert>
                }
                {build === true && 
                    <Alert severity="success" sx={{ m: 1 }}>Build succesful!</Alert>
                }
                {run === true &&
                    <Alert severity="success" sx={{ m: 1 }}>Run successful!</Alert>
                }
                {buildError === true &&
                    <Alert severity="error" sx={{m:1}}>Build has failed. Either choose a language or compilation option or recheck syntax.</Alert>
                }
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item>
                        <FormControl variant="standard" sx={{minWidth: 64}}>
                            <Select
                                value={language}
                                onChange={handleLanguage}
                                label="Language"
                            >
                            <MenuItem value={"c"}>C</MenuItem>
                            <MenuItem value={"cpp"}>C++</MenuItem>
                            <MenuItem value={"rust"}>Rust</MenuItem>
                            <MenuItem value={"wat"}>Wat</MenuItem>
                            <MenuItem value={"wasm"}>Wasm</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="standard" sx={{minWidth: 64}}>
                            <Select
                                value={compilation}
                                onChange={handleCompilation}
                                label="Compilation"
                            >   
                                {language === "c" &&
                                    <MenuItem value={"gcc"}>gcc</MenuItem>
                                }
                                {language === "cpp" &&
                                    <MenuItem value={"gpp"}>gpp</MenuItem>
                                }
                                {language === "rust" &&
                                    <MenuItem value={"rustc"}>rustc</MenuItem>
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button onClick={toggleBuildState} variant="outlined" color="inherit" data-cy="codeInputBuild" sx={{minWidth: 64}}>
                            Build
                        </Button>
                        <Button onClick={toggleRunState} variant="outlined" color="inherit" data-cy="codeInputRun" sx={{minWidth: 64}}>
                            Run
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        {language !== "wat" && language !== "wasm" && 
                            <CodeMirror
                                height="300px"
                                onChange={onChange}
                                placeholder="You can input C, C++ or Rust code here! Choose it in the dropdown along with a compilation option!"
                            />
                        }
                        {(language === "wat" || language === "wasm") &&
                            <CodeMirror
                                height="300px"
                                onChange={onChange}
                                placeholder="Please enter your Wat or Wasm code in the right input box!"
                                editable={false}
                            />
                        }
                    </Grid>
                    <Grid item xs={6}>
                        {(language === "wat" || language === "wasm") && 
                            <CodeMirror
                            height="300px"
                            onChange={onChange}
                            placeholder="You do not need a compilation option. Please write your Wat or Wasm code here."
                            />
                        }
                        {language !== "wat" && language !== "wasm" &&
                            <CodeMirror
                            height="300px"
                            onChange={onChange}
                            placeholder="We will display the Wat or Wasm code here."
                            editable={false}
                            />
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item>
                            <Button variant="outlined" color="inherit" startIcon={<DownloadIcon />}>
                                Wat
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="inherit" startIcon={<DownloadIcon />}>
                                Wasm
                            </Button>
                        </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={6}>
                        <CodeMirror
                            height="300px"
                            value={output}
                            editable={false}
                            onUpdate={output}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
};