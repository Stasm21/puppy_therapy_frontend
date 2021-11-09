import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import NoLink from "../../utilComp/NoLink";
import { routes } from "../../Routes/routes";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: "black",
}));
const StyledButton = styled(Button)(({ theme }) => ({
  margin: "10px",
  textDecoration: "none",
}));
const DefaultNavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar style={{}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Puppy Therapy
          </Typography>
          <NoLink to={routes.login}>
            <StyledButton variant="contained">Login</StyledButton>
          </NoLink>
          <NoLink to={routes.register}>
            <StyledButton variant="contained">Register</StyledButton>
          </NoLink>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};
export default DefaultNavBar;
