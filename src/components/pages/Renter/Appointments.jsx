import React, { useState, useEffect } from "react";
import { useStore } from "../../../store/Store";
import { apiUrl } from "../../../store/siteurl";
import BackgroundPaper from "../../utilComp/BackgroundPaper";
import { Snackbar, Card, Grid, Typography, Alert } from "@mui/material";
import axios from "axios";
import BookingCard from "../Owner/BookingCard";

const Appointments = () => {
  const [appointments, setAppointments] = useState(null);
  const accessToken = useStore((state) => state.accessToken);
  const userInfo = useStore((state) => state.userInfo);

  const [openSnack, setOpenSnack] = useState(false);
  const [error, setError] = useState(false);

  const getAppointments = () => {
    axios
      .get(`${apiUrl}/api/user-profile/`)
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      accessToken && `Bearer ${accessToken}`;
    getAppointments();
  }, []);

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
                <BookingCard bookingInfo={appointment} />
              ))}
            </Grid>
          </Card>
        </Grid>
      )}
    </BackgroundPaper>
  );
};

export default Appointments;
