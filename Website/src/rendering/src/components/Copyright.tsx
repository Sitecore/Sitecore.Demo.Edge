import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { ComponentProps } from 'lib/component-props';

type CopyrightProps = ComponentProps;

const Copyright = (props: CopyrightProps): JSX.Element => (
  <Typography variant="body2" color="textSecondary">
    Copyright © {new Date().getFullYear()}{' '}
    <Link color="inherit" href="https://material-ui.com/" style={{ marginLeft: 0 }}>
      PLAY! Summit
    </Link>
  </Typography>
);

export default Copyright;
