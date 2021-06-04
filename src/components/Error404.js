import React from 'react';
import {Container, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(3)
    }
}))

const Error404 = () => {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Typography variant="h4">Ups... there is no such page</Typography>
        </Container>
    );
};

export default Error404;
