import React from 'react';
import {Container, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(3),
    },
    content: {
        width: '90%',
        margin: '0 auto'
    }
}))

const About = () => {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Typography variant="h4" gutterBottom={true}>About</Typography>
            <div className={classes.content}>
                <Typography variant={"body1"} component={"p"}>
                    My name is Adrian. I study Computer Science at Warsaw University of Technology, in the Faculty of Electrical
                    Engineering. I am a 2-nd year student. I have a lot of positive personality traits. Regarding to my
                    diligence trait, it is worth mentioning that during the holidays I have been working on a various
                    positions not related to the IT industry since 2015. I am passionate about coding in any form –
                    from low-level languages like assembler to high-level like python. I do not have any working
                    experience in this field, but some coding projects were made in recent years by me, which are
                    shown in the “Projects” section.
                </Typography>
            </div>
        </Container>
    );
};

export default About;
