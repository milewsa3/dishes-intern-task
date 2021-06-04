import React, {useState} from 'react';
import {
    Button,
    Container,
    Grow,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    Slider,
    TextField,
    Typography
} from "@material-ui/core";
import TimeField from 'react-simple-timefield';

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
        alignItems: 'center',
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
        marginTop: theme.spacing(2)
    }
}))

const Home = () => {
    const classes = useStyles()
    const [name, setName] = useState("")
    const [duration, setDuration] = useState('00:00:00')
    const [type, setType] = useState("pizza")

    //optional
    const [numberOfSlices, setNumberOfSlices] = useState()
    const [diameter, setDiameter] = useState()

    const[spicinessScale, setSpicinessScale] = useState(1)

    const [slicesOfBread, setSlicesOfBread] = useState();

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('ez')
    }

    return (
        <Grow in>
            <Container maxWidth={"md"} className={classes.container}>
                <Container maxWidth={"xs"}>
                    <Paper className={classes.paper} elevation={5}>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Typography variant={"h4"} className={classes.topLabel} gutterBottom={true}>Dishes!</Typography>
                            <TextField
                                label="name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <TimeField
                                showSeconds
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                style={{width: 92}}
                                input={<TextField label="Duration" value={duration} variant="outlined" />}
                                required
                            />
                            <Select
                                label={"Type"}
                                value={type}
                                onChange={(e => setType(e.target.value))}
                                className={classes.dishType}
                            >
                                <MenuItem value={"pizza"}>Pizza</MenuItem>
                                <MenuItem value={"soup"}>Soup</MenuItem>
                                <MenuItem value={"sandwich"}>Sandwich</MenuItem>
                            </Select>
                            {type === "pizza" && (
                                <>
                                    <TextField
                                        label={"Number of slices"}
                                        type={"number"}
                                        value={numberOfSlices}
                                        onChange={(e) => setNumberOfSlices(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        label={"Diameter"}
                                        type={"number"}
                                        value={diameter}
                                        onChange={(e) => setDiameter(e.target.value)}
                                        required
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
                                    defaultValue={slicesOfBread}
                                    required
                                    value={slicesOfBread}
                                    onChange={(e) => setSlicesOfBread(e.target.value)}
                                />
                            )}
                            <Button color={"primary"} variant={"contained"} type="submit" className={classes.submitBtn}>Submit</Button>
                        </form>
                    </Paper>
                </Container>
            </Container>
        </Grow>
    );
};

export default Home;
