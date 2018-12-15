/*
  This file contains CSS classes and parameters to be injected into our frame using withStyles()
*/
import { red, 
         orange,
         yellow,
         lightGreen,
         green,
         blue } from 'material-ui/colors';
import { createMuiTheme } from "@material-ui/core/styles";
const drawerWidth = 200; // Drawer Width Const is applied in styles.drawerPaper.width

export default theme => ({
  root: {
    height: 1920,
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  card: {
    minwidth: 60,
    minHeight: 300
  },
  cardButton: {
    flex: 1,
    backgroundColor: "#3366cc",
    color: "#ffffff"
  },
  flex: {
    flex: 1
  },
  logo: {
    width: drawerWidth
  },
  appBar: {
    //background: "linear-gradient(45deg, #3366cc 30%, #ccffff 99%)",
    background: "#2196f3",
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbar: theme.mixins.toolbar,
  paper: {
    //flexGrow: 1,
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  submitButton: {
    flex: 1,
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[900]
    },
    color: '#ffffff',
    justifyContent: 'center'
  },
  oneButton: {
   flex: 1,
   backgroundColor: red[500],
   '&:hover': {
     backgroundColor: red[900]
   },
   color: '#ffffff'
  },
  twoButton: {
   flex: 1,
   backgroundColor: orange[500],
   '&:hover': {
     backgroundColor: orange[900]
   },
   color: '#ffffff'
  }, 
 threeButton: {
   flex: 1,
   backgroundColor: yellow[500],
   '&:hover': {
     backgroundColor: yellow[900]
   },
   color: '#ffffff'
  },
  fourButton: {
   flex: 1,
   backgroundColor: lightGreen[500],
   '&:hover': {
     backgroundColor: lightGreen[900]
   },
   color: '#ffffff'
  },
  fiveButton: {
   flex: 1,
   backgroundColor: green[500],
   '&:hover': {
     backgroundColor: green[900]
   },
   color: '#ffffff'
  },
});
