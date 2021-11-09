import { useState, useEffect } from "react";
import { useStore } from "../../../store/Store";
import {
  TextField,
  Typography,
  Button,
  Stack,
  Grid,
  Card,
} from "@mui/material";
import BaseProfile from "./BaseProfile";
import MapWrapper from "../../Map/MapWrapper";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import { apiUrl } from "../../../store/siteurl";
import ReviewCard from "./ReviewCard";
const OwnerProfile = (props) => {
  const userInfo = useStore((state) => state.userInfo);
  const [userLocation, setUserLocation] = useState(null);
  const [userReviews, setUserReviews] = useState(null);

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
    axios.get(`${apiUrl}/api/ownerReviews/`).then((res) => {
      setUserReviews(res.data);
    });
  }, []);
  return (
    <BaseProfile>
      <Typography variant="h3" align="center" sx={{ mb: 5 }}>
        Hello {userInfo.user.first_name}
      </Typography>
      {userReviews && (
        <Card raised={true} sx={{ mb: 5 }}>
          <Typography variant="h3" align="center" sx={{ mt: 5 }}>
            Reviews You've Received
          </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 10, mt: 10 }}
          >
            {!userReviews ||
              (userReviews.length == 0 && (
                <Typography variant="h5">
                  You've Not Received Any Reviews Yet
                </Typography>
              ))}
            {userReviews.map((review) => (
              <ReviewCard
                name={review?.toPuppy?.name}
                ratingDescription={review?.text}
                ratingNum={review?.score}
                sender={review?.fromUser?.user?.first_name}
                image={review?.toPuppy?.image}
                profileSlug={review?.fromUser?.user?.username}
                dogId={review?.toPuppy?.id}
              />
            ))}
          </Grid>
        </Card>
      )}
      <Card>
        <Typography variant="h3" align="center">
          Your Info
        </Typography>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 10, mt: 10 }}
        >
          <Grid item container sm={8} rowSpacing={5}>
            <TextField
              disabled
              label="Name"
              defaultValue={`${userInfo?.user?.first_name || "N/A  "} ${
                userInfo?.user?.last_name
              }`}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 5, mr: 3 }}
            />
            <TextField
              disabled
              label="City"
              defaultValue={userInfo?.city || "N/A"}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 5, mr: 3 }}
            />
            <TextField
              disabled
              label="State"
              defaultValue={userInfo?.state || "N/A"}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 5, mr: 3 }}
            />
            <TextField
              disabled
              label="Street Address"
              defaultValue={userInfo?.street_address || "N/A"}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 5, mr: 3 }}
            />
            <TextField
              disabled
              label="Zip Code"
              defaultValue={userInfo?.zip_code || "N/A"}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 5, mr: 3 }}
            />
          </Grid>

          {userInfo?.latitude && userInfo?.longitude ? (
            <Grid item sm={8}>
              <MapWrapper
                center={{ lat: userInfo?.latitude, lng: userInfo?.longitude }}
                zoom={10}
              >
                <Stack
                  direction="row"
                  lng={userInfo?.longitude}
                  lat={userInfo?.latitude}
                >
                  <LocationOnIcon />
                  <Typography sx={{ mt: 2 }}>You're here</Typography>
                </Stack>
              </MapWrapper>
            </Grid>
          ) : !userLocation ? (
            <Typography>Please enable location sharing</Typography>
          ) : (
            <MapWrapper center={userLocation} zoom={15}>
              <LocationOnIcon
                sx={{
                  position: "absolute",
                  transform: "translate(-50%, -50%)",
                  fontSize: 40,
                }}
              />
            </MapWrapper>
          )}
          {!userInfo?.latitude && !userInfo?.longitude && (
            <Button onClick={handleClick}>Enable Location</Button>
          )}
        </Grid>
      </Card>
    </BaseProfile>
  );
};

export default OwnerProfile;
