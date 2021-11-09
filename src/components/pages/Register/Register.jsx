import axios from "axios";
import React, { useState, useEffect } from "react";
import { useStore } from "../../../store/Store";
import { useHistory } from "react-router";
import { apiUrl } from "../../../store/siteurl";
import BackgroundPaper from "../../utilComp/BackgroundPaper";
import {
  Button,
  Card,
  FormControl,
  Grid,
  TextField,
  Select,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import MapWrapper from "../../Map/MapWrapper";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const user_types = [
  { value: "Owner", label: "Owner" },
  { value: "Renter", label: "Renter" },
];
const Register = () => {
  const history = useHistory();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state_, setState_] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [rating, setRating] = useState(5);
  const [userType, setUserType] = useState("Owner");
  const [userLocation, setUserLocation] = useState(null);

  const accessToken = useStore((state) => state.accessToken);
  const setUserInfo = useStore((state) => state.setUserInfo);
  const setAccessToken = useStore((state) => state.setAccessToken);
  const mapLocation = useStore((state) => state.mapLocation);

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser();
  };
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      console.log(userLocation);
    });
  };

  useEffect(() => {
    if (accessToken) {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    console.log(mapLocation);
  }, [mapLocation]);

  const registerUser = () => {
    let info = {
      username,
      password,
      email,
      first_name: firstName,
      last_name: lastName,
      street_address: streetAddress,
      city,
      state: state_,
      zip_code: zipCode,
      rating,
      user_type: userType,
      latitude: mapLocation.ltd || userLocation?.lat,
      longitude: mapLocation?.lng || userLocation?.lng,
    };
    console.log(info);
    axios
      .post(`${apiUrl}/auth/register/`, info)
      .then((res) => {
        setAccessToken(res.data.access);
        setUserInfo(res.data.access);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BackgroundPaper>
      <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>
        Register for an account
      </Typography>

      <Grid container justifyContent="center" alignItems="center">
        <Card sx={{ padding: "10px 50px 20px 50px", width: "50vh" }}>
          <FormControl
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            sx={{ width: "100%" }}
          >
            <TextField
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              label="Username"
              onChange={(event) => setUserName(event.target.value)}
              required
            />
            <br />
            <TextField
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              label="Password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <br />

            <TextField
              type="text"
              value={email}
              placeholder="Email"
              label="Email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <br />

            <TextField
              type="text"
              value={firstName}
              placeholder="First Name"
              label="First Name"
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
            <br />
            <TextField
              type="text"
              value={lastName}
              placeholder="Last Name"
              label="Last Name"
              onChange={(event) => setLastName(event.target.value)}
              required
            />
            <br />
            <TextField
              type="text"
              value={streetAddress}
              label="Street Address"
              placeholder="Street Address"
              onChange={(event) => setStreetAddress(event.target.value)}
            />
            <br />
            <TextField
              type="text"
              value={city}
              placeholder="City"
              label="City"
              onChange={(event) => setCity(event.target.value)}
            />
            <br />
            <TextField
              type="text"
              value={state_}
              label="State"
              placeholder="State"
              onChange={(event) => setState_(event.target.value)}
            />
            <br />

            {!userLocation ? (
              <>
                <Typography>Please enable location sharing to find</Typography>
                <Button onClick={handleClick}>Enable Location</Button>
              </>
            ) : (
              <MapWrapper center={userLocation} zoom={15}>
                <Stack>
                  <LocationOnIcon
                    sx={{ fontSize: "40px" }}
                    lat={mapLocation?.lat}
                    lng={mapLocation?.lng}
                  />
                </Stack>
              </MapWrapper>
            )}

            <br />
            <TextField
              type="number"
              value={zipCode}
              label="Zip Code"
              placeholder="Zip Code"
              onChange={(event) => setZipCode(event.target.value)}
            />

            <br />
            <Select
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
              }}
            >
              {user_types.map(({ value, label }, index) => (
                <MenuItem value={value}>{label}</MenuItem>
              ))}
            </Select>
            <br />
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Register
            </Button>
          </FormControl>
        </Card>
      </Grid>
    </BackgroundPaper>
  );
};

export default Register;
