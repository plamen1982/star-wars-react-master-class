import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import { styles } from './styles';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../contexts';

export default function EpisodeCard({ data, direction }) {
  const {
    currentTheme: {
      colors: { cards, defaultColors },
    },
  } = useContext(ThemeContext);
  const styleWithTheme = { ...styles[direction], cards, defaultColors };
  debugger;
  const useStyles = makeStyles(styleWithTheme);
  const classes = useStyles();
  const { node: movie } = data;
  return (
    <Card className={`${classes.defaultColors} ${classes.container}`}>
      {direction === 'horizontal' ? (
        <>
          <Card className={`${classes.imageAndTitle} ${classes.cards}`}>
            <div>
              <img
                className={classes.imageStyles}
                src={movie.image}
                alt="url"
              />
            </div>
            <div>
              <Link to={`/episodes/${movie.episodeId}`}>{movie.title}</Link>
            </div>
          </Card>
          <Card className={`${classes.cards} ${classes.openingDescription}`}>
            <CardContent>
              <Typography
                className={classes.title}
                color={classes.cards.color}
                gutterBottom
              >
                {movie.openingCrawl}
              </Typography>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <CardContent className={`${classes.imageAndTitle} ${classes.cards}`}>
            <div>
              <img
                className={classes.imageStyles}
                src={movie.image}
                alt="url"
              />
            </div>
            <div>
              <Link to={`/episodes/${movie.episodeId}`}>{movie.title}</Link>
            </div>
          </CardContent>
          <Card className={`${classes.cards} ${classes.openingDescription}`}>
            <CardContent>
              <Typography
                className={classes.title}
                color={classes.cards.color}
                gutterBottom
              >
                {movie.openingCrawl}
              </Typography>
            </CardContent>
          </Card>
        </>
      )}
    </Card>
  );
}
