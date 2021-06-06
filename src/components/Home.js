import React, {useState} from 'react';
import {
    Button,
    Container, FormControl,
    Grow, InputLabel,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    Slider, Snackbar,
    TextField,
    Typography
} from "@material-ui/core";
import TimeField from 'react-simple-timefield';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(4),
    },
    paper: {
        marginBottom: theme.spacing(3),
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(2),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    inputs: {
        display: 'flex',
        flexDirection: 'column',
        '& *': {
            marginBottom: theme.spacing(1),
        }
    },
    topLabel: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(3)
    },
    dishType: {
        marginBottom: theme.spacing(2),
        width: '60%'
    },
    submitBtn: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        minWidth: 120
    }
}))

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const preventNegativeNum = (val) => {
    return val < 0 ? 0 : val;
}

const Home = () => {
    const classes = useStyles()
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(false)

    // required data
    const [name, setName] = useState("")
    const [duration, setDuration] = useState('00:00:00')
    const [type, setType] = useState("pizza")

    // optional data
    const [numberOfSlices, setNumberOfSlices] = useState('')
    const [diameter, setDiameter] = useState('')
    const [spicinessScale, setSpicinessScale] = useState(1)
    const [slicesOfBread, setSlicesOfBread] = useState('');

    // errors
    const [errors, setErrors] = useState({})

    // snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success")
    const [snackbarMessage, setSnackbarMessage] = useState("")

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitBtnDisabled(true)
        setErrors({})

        const data = {
            name,
            preparation_time: duration,
            type,
        }

        switch (type) {
            case "pizza":
                data.no_of_slices = parseInt(numberOfSlices)
                data.diameter = parseFloat(diameter)
                break
            case "soup":
                data.spiciness_scale = spicinessScale
                break
            case "sandwich":
                data.slices_of_bread = parseInt(slicesOfBread)
                break
            default:
        }

        fetch('https://frosty-wood-6558.getsandbox.com:443/dishes', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    setSnackbarSeverity("success")
                    setSnackbarMessage("Dish sent correctly!")
                    setOpenSnackbar(true);
                } else {
                    setErrors(data)
                }

                setSubmitBtnDisabled(false)
            })
            .catch(err => {
                setSnackbarSeverity("error")
                setSnackbarMessage("Something went wrong")
                setOpenSnackbar(true);

                console.log(err)
            })
    }


    return (
        <>
            <Grow in>
                <Container maxWidth={"md"} className={classes.container}>
                    <Container maxWidth={"xs"}>
                        <Paper className={classes.paper} elevation={8}>
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <div className={classes.inputs}>
                                    <Typography variant={"h4"} className={classes.topLabel} gutterBottom={true} align={"center"}>Dishes! ☕️</Typography>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        error={Boolean(errors?.name)}
                                        helperText={errors?.name}
                                    />
                                    <TimeField
                                        showSeconds
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        style={{width: '100%'}}
                                        input={<TextField label="Duration" value={duration} variant="outlined" />}
                                        required
                                        error={Boolean(errors?.preparation_time)}
                                        helperText={errors?.preparation_time}
                                    />
                                    <FormControl
                                        variant={"outlined"}
                                        className={classes.formControl}
                                        error={Boolean(errors?.type)}
                                    >
                                        <InputLabel id="type-label">Type</InputLabel>
                                        <Select
                                            labelId="type-label"
                                            id="type-select"
                                            value={type}
                                            onChange={(e => setType(e.target.value))}
                                            label="Type"
                                        >
                                            <MenuItem value={"pizza"}>Pizza</MenuItem>
                                            <MenuItem value={"soup"}>Soup</MenuItem>
                                            <MenuItem value={"sandwich"}>Sandwich</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {type === "pizza" && (
                                        <>
                                            <TextField
                                                label={"Number of slices"}
                                                type={"number"}
                                                variant={"outlined"}
                                                value={numberOfSlices}
                                                onChange={(e) => setNumberOfSlices(preventNegativeNum(e.target.value))}
                                                required
                                                error={Boolean(errors?.no_of_slices)}
                                                helperText={errors?.no_of_slices}
                                            />
                                            <TextField
                                                label={"Diameter"}
                                                type={"number"}
                                                variant={"outlined"}
                                                value={diameter}
                                                onChange={(e) => setDiameter(preventNegativeNum(e.target.value))}
                                                required
                                                error={Boolean(errors?.diameter)}
                                                helperText={errors?.diameter}
                                            />
                                        </>
                                    )}
                                    {type === "soup" && (
                                        <>
                                            <Typography id="scale-slider" gutterBottom>
                                                Spiciness scale
                                            </Typography>
                                            <Slider
                                                value={spicinessScale}
                                                onChange={(event, newValue) => setSpicinessScale(newValue)}
                                                getAriaValueText={() => spicinessScale}
                                                aria-labelledby="scale-slider"
                                                valueLabelDisplay="auto"
                                                step={1}
                                                marks
                                                min={1}
                                                max={10}
                                            />
                                        </>
                                    )}
                                    {type === "sandwich" && (
                                        <TextField
                                            label={"Slices of bread"}
                                            type={"number"}
                                            variant={"outlined"}
                                            required
                                            value={slicesOfBread}
                                            onChange={(e) => setSlicesOfBread(preventNegativeNum(e.target.value))}
                                            error={Boolean(errors?.slices_of_bread)}
                                            helperText={errors?.slices_of_bread}
                                        />
                                    )}
                                </div>
                                <Button color={"primary"} variant={"contained"} type="submit" className={classes.submitBtn} disabled={submitBtnDisabled}>Submit</Button>
                            </form>
                        </Paper>
                    </Container>
                </Container>
            </Grow>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Home;
