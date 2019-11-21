import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#af0b76',
    '&:hover': {
      backgroundColor: '#af0b76',
    }
  },
  img:{
    height: '38px',
    borderRadius: '50%',
    marginRight: '12px'
  },
}));

export default function ContainedButtons(props) {
  const classes = useStyles();

  let dom;
  if (props.user) {
    dom = <img src={props.user.photoURL} className={classes.img} />;
  } else {
    dom = <Button variant="contained" color="primary" className={classes.button} onClick={props.onClick}>
      Sign In
  </Button>
  }

  return (dom);
}
