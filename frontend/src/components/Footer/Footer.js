import React from "react";
import { Typography, Link, Box } from "@material-ui/core";
function Footer() {
  return (
    <div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="/">
            Avva Database {new Date().getFullYear()}
          </Link>
        </Typography>
      </Box>
    </div>
  );
}

export default Footer;
