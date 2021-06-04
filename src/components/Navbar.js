import React from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        backgroundColor: theme.palette.primary.main
    },
    logo: {
        marginLeft: theme.spacing(4),
        textDecoration: 'none',
        color: 'white',
    },
    menu: {
        display: 'flex',
        justifyContent: 'space-around',
        width: theme.spacing(35),
        marginRight: theme.spacing(6),
        '& *': {
            textDecoration: 'none',
            color: 'white',
        }
    },
    activeLink: {
        opacity: 0.8
    }
}))

const Navbar = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <NavLink exact to="/" className={classes.logo}>
                <Typography variant={"h4"} >Adrian Milewski</Typography>
            </NavLink>
            <div className={classes.menu}>
                <NavLink exact to="/" activeClassName={classes.activeLink}>
                    <Typography variant={"h6"}>Home</Typography>
                </NavLink>
                <NavLink exact to="/about" activeClassName={classes.activeLink}>
                    <Typography variant={"h6"}>About</Typography>
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;
