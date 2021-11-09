import AppBar from "@mui/material/AppBar";
import { Box, Stack } from "@mui/material/";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import NoLink from "../../utilComp/NoLink";
import { useStore } from "../../../store/Store";
import { routes } from "../../Routes/routes";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: "black",
}));
const StyledButton = styled(Button)(({ theme }) => ({
  margin: "10px",
  textDecoration: "none",
}));
const OwnerNavBar = () => {
  const userInfo = useStore((state) => state.userInfo);
  const logout = useStore((state) => state.logOut);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
            <NoLink to={routes.home}> Puppy Therapy</NoLink>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NoLink to={routes.ownerMyPups}> My Puppies</NoLink>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NoLink to={routes.ownerProfile}> Profile</NoLink>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NoLink to={routes.ownerPostPuppy}> Post Puppy</NoLink>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NoLink to={routes.ownerAvailability}> My Availability</NoLink>
          </Typography>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hey {userInfo.user?.first_name}
            </Typography>
            <StyledButton variant="contained" onClick={logout}>
              Logout
            </StyledButton>
          </Stack>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};

export default OwnerNavBar;
