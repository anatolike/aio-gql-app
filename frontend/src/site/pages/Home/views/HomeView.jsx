import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import BaseLayout from "../../../../components/BaseLayout";

const HomeView = () => {
  return (
    <BaseLayout>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Home page
        </Typography>
      </Container>
    </BaseLayout>
  );
}

export default HomeView
