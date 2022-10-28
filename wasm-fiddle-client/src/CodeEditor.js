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
    const [language, setLanguage] = React.useState("");
    const [compilation, setCompilation] = React.useState("");
    const onChange = React.useCallback((value, viewUpdate) => {
        console.log('value: ', value);
    }, []);
    
    const toggleBuildState = () => {
        setBuild(!build);
        console.log(build);
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
                {build === false &&
                    <Alert severity="info" sx={{ m: 1 }}>Choose a language and compilation option, enter your code, then click build and run!</Alert>
                }
                {build === true && 
                    <Alert severity="success" sx={{ m: 1 }}>Build succesful!</Alert>
                }
                {run === true &&
                    <Alert severity="success" sx={{ m: 1 }}>Run successful!</Alert>
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
                        <CodeMirror
                            height="300px"
                            onChange={onChange}
                            placeholder="You can input C, C++ or Rust code here!"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CodeMirror
                            height="300px"
                            onChange={onChange}
                            placeholder="You can input Wat or Wasm code here!"
                        />
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