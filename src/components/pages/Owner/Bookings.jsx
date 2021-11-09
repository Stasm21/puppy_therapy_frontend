import React, { useState, useEffect } from "react";
import { useStore } from "../../../store/Store";
import { apiUrl } from "../../../store/siteurl";
import BackgroundPaper from "../../utilComp/BackgroundPaper";
import {
  Button,
  Snackbar,
  Card,
  FormControl,
  Grid,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
import BookingCard from "./BookingCard";

const Bookings = () => {
  const [appointments, setAppointments] = useState(null);
  const accessToken = useStore((state) => state.accessToken);
  const userInfo = useStore((state) => state.userInfo);

  const [availableFrom, setAvailableFrom] = useState(
    userInfo?.available_from || 0
  );
  const [availableUntil, setAvailableUntil] = useState(
    userInfo?.available_until || 0
  );
  const [openSnack, setOpenSnack] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser();
  };

  const getAppointments = () => {
    axios
      .get(`${apiUrl}/api/user-profile/`)
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => {
        setError(true);
        setOpenSnack(true);

        console.log(err);
      });
  };

  const update = (appointment, state) => {
    let info;
    if (state) {
      info = { accepted: 1 };
    } else {
      info = { accepted: 2 };
    }
    axios
      .patch(`${apiUrl}/api/user-profile/${appointment.id}/`, info)
      .then((res) => {
        setError(false);
        setOpenSnack(true);
        getAppointments();
      })
      .catch((err) => {
        setError(true);
        setOpenSnack(true);

        console.log(err);
      });
  };

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      accessToken && `Bearer ${accessToken}`;
    getAppointments();
  }, []);

  const registerUser = () => {
    let info = {
      available_from: availableFrom,
      available_until: availableUntil,
    };
    axios
      .patch(`${apiUrl}/api/user-profile/${userInfo?.id}/`, info)
      .then((res) => {
        setError(false);
        setOpenSnack(true);
      })
      .catch((err) => {
        setError(true);
        setOpenSnack(true);

        console.log(err);
      });
  };

  return (
    <BackgroundPaper>
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
            : "Saved Successfully"}
        </Alert>
      </Snackbar>
      {appointments && (
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          sx={{ mb: 10 }}
        >
          <Card sx={{ padding: "10px 50px 20px 50px", width: "100vh" }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>
              Your Appointments
            </Typography>

            <br />
            <Grid
              container
              justifyContent="space-around"
              alignItems="center"
              sx={{ mb: 10 }}
            >
              {appointments.map((appointment) => (
                <BookingCard
                  bookingInfo={appointment}
                  deny={() => {
                    update(appointment, false);
                  }}
                  accept={() => {
                    update(appointment, true);
                  }}
                />
              ))}
            </Grid>
          </Card>
        </Grid>
      )}
      <Grid container justifyContent="center" alignItems="center">
        <Card sx={{ padding: "10px 50px 20px 50px", width: "50vh" }}>
          <FormControl
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            sx={{ width: "100%" }}
          >
            <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>
              Set your availability
            </Typography>
            <TextField
              type="number"
              name="availableFrom"
              value={availableFrom}
              placeholder="Available From"
              label="Available From"
              onChange={(event) => setAvailableFrom(event.target.value)}
              required
            />
            <br />
            <TextField
              type="number"
              name="availableUntil"
              value={availableUntil}
              placeholder="Available Until"
              label="Available Until"
              onChange={(event) => setAvailableUntil(event.target.value)}
              required
            />
            <br />

            <Button
              variant="contained"
              type="submit"
              onClick={handleSubmit}
              disabled={!availableFrom || !availableUntil}
            >
              Save
            </Button>
          </FormControl>
        </Card>
      </Grid>
    </BackgroundPaper>
  );
};

export default Bookings;
