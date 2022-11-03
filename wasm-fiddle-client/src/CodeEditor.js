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
                    <Alert severity="info" sx={{ m: 1 }} data-cy="infoAlert">Choose a language and compilation option, enter your code, then click build and run!</Alert>
                }
                {build === true && 
                    <Alert severity="success" sx={{ m: 1 }} data-cy="buildSuccessAlert">Build succesful!</Alert>
                }
                {run === true &&
                    <Alert severity="success" sx={{ m: 1 }} data-cy="runSuccessAlert">Run succesful!</Alert>
                }
                {buildError === true &&
                    <Alert severity="error" sx={{m:1}} data-cy="buildFailAlert">Build has failed. Either choose a language or compilation option or recheck syntax.</Alert>
                }
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item>
                        <FormControl variant="standard" sx={{minWidth: 64}}>
                            <Select
                                value={language}
                                onChange={handleLanguage}
                                label="Language"
                                data-cy="languageDropdown"
                            >
                            <MenuItem value={"c"} data-cy="languageDropdownC">C</MenuItem>
                            <MenuItem value={"cpp"} data-cy="languageDropdownCpp">C++</MenuItem>
                            <MenuItem value={"rust"} data-cy="languageDropdownRust">Rust</MenuItem>
                            <MenuItem value={"wat"} data-cy="languageDropdownWat">Wat</MenuItem>
                            <MenuItem value={"wasm"} data-cy="languageDropdownWasm">Wasm</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl variant="standard" sx={{minWidth: 64}}>
                            <Select
                                value={compilation}
                                onChange={handleCompilation}
                                label="Compilation"
                                data-cy="compilationDropdown"
                            >   
                                {language === "c" &&
                                    <MenuItem value={"gcc"} data-cy="dropdownGcc">gcc</MenuItem>
                                }
                                {language === "cpp" &&
                                    <MenuItem value={"gpp"} data-cy="dropdownGpp">gpp</MenuItem>
                                }
                                {language === "rust" &&
                                    <MenuItem value={"rustc"} data-cy="dropdownRustc">rustc</MenuItem>
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
                                data-cy="mainInputEditor"
                            />
                        }
                        {(language === "wat" || language === "wasm") &&
                            <CodeMirror
                                height="300px"
                                onChange={onChange}
                                placeholder="Please enter your Wat or Wasm code in the right input box!"
                                editable={false}
                                data-cy="mainInputEditor"
                            />
                        }
                    </Grid>
                    <Grid item xs={6}>
                        {(language === "wat" || language === "wasm") && 
                            <CodeMirror
                            height="300px"
                            onChange={onChange}
                            placeholder="You do not need a compilation option. Please write your Wat or Wasm code here."
                            data-cy="wasmEditor"
                            />
                        }
                        {language !== "wat" && language !== "wasm" &&
                            <CodeMirror
                            height="300px"
                            onChange={onChange}
                            placeholder="We will display the Wat or Wasm code here."
                            editable={false}
                            data-cy="wasmEditor"
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
                            data-cy="outputEditor"
                        />
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
};