import { useState, useEffect } from "react";
import { useStore } from "../../../store/Store";
import {
  TextField,
  Typography,
  Select,
  MenuItem,
  Stack,
  Grid,
  Card,
  CardMedia,
  FormControl,
  InputLabel,
  Button,
  SnackBar,
  Alert,
  Snackbar,
  FormControlLabel,
} from "@mui/material";
import MapWrapper from "../../Map/MapWrapper";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import { apiUrl } from "../../../store/siteurl";
import { useParams } from "react-router-dom";
import NoLink from "../../utilComp/NoLink";
import { routes } from "../../Routes/routes";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const SinglePuppy = (props) => {
  const userInfo = useStore((state) => state.userInfo);
  const [puppyInfo, setPuppyInfo] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState(null);

  const [openSnack, setOpenSnack] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`${apiUrl}/api/get-puppies/${id}/`).then((res) => {
      setPuppyInfo(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${apiUrl}/api/get-puppies/${id}/`).then((res) => {
      setPuppyInfo(res.data);
    });
  }, [id]);

  const handleAppointment = () => {
    let info = {
      enthusiast: userInfo?.id,
      date: appointmentDate,
      timeslot: appointmentTime,
      puppy: puppyInfo?.id,
    };
    axios
      .post(`${apiUrl}/api/user-profile/`, info)
      .then((res) => {
        setError(false);
        setOpenSnack(true);
      })
      .catch((err) => {
        setError(true);
        setOpenSnack(true);
      });
  };
  return (
    <>
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => {
          setOpenSnack(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenSnack(false);
          }}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error
            ? "An error has occured. Please try again"
            : "Appointment Created"}
        </Alert>
      </Snackbar>
      <Typography variant="h3" align="center" sx={{ mb: 2, mt: 4 }}>
        Say Hello To {puppyInfo?.name}
      </Typography>

      <Card>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 10, mt: 10 }}
        >
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            sm={8}
            sx={{ mb: 5 }}
          >
            <Grid item>
              <CardMedia
                component="img"
                sx={{
                  width: {
                    xs: 200,
                    sm: 400,
                    xl: 500,
                  },
                  mb: 4,
                }}
                image={puppyInfo?.image}
                alt={puppyInfo?.name}
              />
              <Typography variant="h6" align="center">
                {puppyInfo?.name}
              </Typography>
              {userInfo?.userType == "Renter" && (
                <Card sx={{ padding: 2 }}>
                  <Stack spacing={2}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                      <DatePicker
                        label="Choose A Date"
                        value={appointmentDate}
                        onChange={(newValue) => {
                          setAppointmentDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <FormControl>
                        <InputLabel>Time</InputLabel>

                        <Select
                          value={appointmentTime}
                          onChange={(e) => {
                            setAppointmentTime(e.target.value);
                          }}
                          label="Time"
                        >
                          {Array.from(Array(24).keys()).map((value, index) => (
                            <MenuItem
                              disabled={
                                value > puppyInfo?.owner?.available_until ||
                                value < puppyInfo?.owner?.available_from
                              }
                              value={value}
                            >
                              {value}:00
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </LocalizationProvider>
                    <Button
                      onClick={handleAppointment}
                      disabled={!appointmentTime || !appointmentDate}
                      variant="contained"
                    >
                      Make an appointment
                    </Button>
                  </Stack>
                </Card>
              )}
            </Grid>
          </Grid>

          <Grid
            item
            sm={8}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item sm={8}>
              <TextField
                disabled
                value={puppyInfo?.name}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 5, mr: 3 }}
              />

              <TextField
                disabled
                label="Breed"
                value={puppyInfo?.breed || "N/A"}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 5, mr: 3 }}
              />
              <TextField
                disabled
                label="Age"
                value={puppyInfo?.age || "N/A"}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 5, mr: 3 }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            sm={8}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item sm={9}>
              <TextField
                disabled
                label="Description"
                multiline
                minRows={3}
                value={puppyInfo?.description || "N/A"}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                sx={{ mb: 5, mr: 3 }}
              />
            </Grid>
          </Grid>
          {puppyInfo?.owner?.latitude && puppyInfo?.owner?.longitude && (
            <Grid item sm={8}>
              <MapWrapper
                center={{
                  lat: puppyInfo?.owner?.latitude,
                  lng: puppyInfo?.owner?.longitude,
                }}
                zoom={20}
              >
                <Stack
                  direction="row"
                  lat={userInfo?.latitude}
                  lng={userInfo?.longitude}
                >
                  <LocationOnIcon
                    sx={{
                      fontSize: 40,
                    }}
                  />
                  <Typography sx={{ mb: 2 }}>You</Typography>
                </Stack>
                <Stack
                  sx={{ mb: 1 }}
                  direction="row"
                  lat={puppyInfo?.owner?.latitude}
                  lng={puppyInfo?.owner?.longitude}
                >
                  <LocationOnIcon
                    sx={{
                      fontSize: 40,
                      color: "red",
                    }}
                  />
                  <Typography sx={{ mt: 2 }}>Owner</Typography>
                </Stack>
              </MapWrapper>
            </Grid>
          )}
        </Grid>
      </Card>
    </>
  );
};

export default SinglePuppy;
