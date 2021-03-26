import React from 'react';
import Grid from './Grid';
import NavBar from './NavBar';
import Visited from './Visited';
import ShortestPath from './ShortestPath';
import AlgoInfo from './AlgoInfo';
import '../assets/css/App.css';
import {
  createMuiTheme,
  ThemeProvider,
  useTheme,
  makeStyles,
} from '@material-ui/core/styles';
// import { useTrail, animated } from 'react-spring';

const darkTheme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      default: '#1F2937', //#151a35
      paper: '#374151', //#222b45
    },
    divider: '#151a30',
    action: {
      hover: '#4B5563',
      selected: '#6B7280',
      active: '#9CA3AF',
    },
  },
  overrides: {
    MuiListItem: {
      root: {
        fontSize: '1rem',
      },
    },

  },
  typography: {
    fontFamily: "'Karla', sans-serif",
  },
});

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
}));

const App = () => {
  const gridRef = React.useRef();
  const classes = useStyles();
  const theme = useTheme();
  const xs = window.matchMedia('(max-width: 576px)').matches;
  const sm = window.matchMedia('(min-width: 576px)').matches;
  const md = window.matchMedia('(min-width: 768px)').matches;
  const lg = window.matchMedia('(min-width: 960px)').matches;
  const xl = window.matchMedia('(min-width: 1200px)').matches;

  const getRow = () => {
    if (xl) return 41;
    if (lg) return 37;
    if (md) return 39;
    if (sm) return 43;
    if (xs) return 43;
    return 60;
  };

  const getColumn = () => {
    if (xl) return 61;
    if (lg) return 45;
    if (md) return 51;
    if (sm) return 41;
    if (xs) return 31;
    return 100;
  };

  // const trail = useTrail(4, {
  //   opacity: 1,
  //   width: '100%',
  //   marginRight: theme.spacing(2),
  //   transform: 'translateY(0px) ',
  //   from: { opacity: 0, transform: 'translateY(100px) ' },
  // });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.toolbar} />
      <div className='app'>
        <NavBar
          visualize={() => {
            gridRef.current.visualize();
          }}
          clearGrid={() => {
            gridRef.current.clearGrid();
          }}
          visualizeMaze={animateMaze => {
            // gridRef.current.visualizeMaze();
          }}
        />
        <div className='content'>
          <Grid ref={gridRef} rows={getRow()} columns={getColumn()} />

          <div className='data'>
            <div className='dataContent'>
              <Visited rows={getRow()} columns={getColumn()} />

              <ShortestPath rows={getRow()} columns={getColumn()} />
            </div>

            <AlgoInfo />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
