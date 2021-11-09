import { Typography } from "@mui/material";
import BackgroundPaper from "../../utilComp/BackgroundPaper";

const PageNotFound = () => {
  return (
    <BackgroundPaper>
      <Typography align="center" variant="h3">
        Sorry this page doesn't exist
      </Typography>
    </BackgroundPaper>
  );
};

export default PageNotFound;
