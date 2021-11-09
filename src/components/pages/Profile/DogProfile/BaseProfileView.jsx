import { useState, useEffect } from "react";
import { useStore } from "../../../../store/Store";
import {
  TextField,
  Typography,
  Button,
  Stack,
  Grid,
  Card,
} from "@mui/material";
import BaseProfile from "../BaseProfile";
import MapWrapper from "../../../Map/MapWrapper";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import { apiUrl } from "../../../../store/siteurl";
import ReviewCard from "../ReviewCard";
import { useParams } from "react-router";

const BaseProfileView = (props) => {
  const userInfo = useStore((state) => state.userInfo);
  const [userLocation, setUserLocation] = useState(null);
  const [userReviews, setUserReviews] = useState(null);
  const [userData, setUserData] = useState(null);
  const [puppies, setPuppies] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`${apiUrl}/api/get-user/${id}/`).then((res) => {
      setUserReviews(res.data.ratings);
      setPuppies(res.data.puppies);
      setUserData(res.data.user);
    });
  }, []);
  useEffect(() => {
    axios.get(`${apiUrl}/api/get-user/${id}/`).then((res) => {
      setUserReviews(res.data.ratings);
      setPuppies(res.data.puppies);
      setUserData(res.data.user);
    });
  }, [id]);
  return (
    <BaseProfile>
      {userData && (
        <Typography variant="h3" align="center" sx={{ mb: 5 }}>
          {userData?.user?.first_name}'s profile page
        </Typography>
      )}
      {userReviews && userData && (
        <Card raised={true} sx={{ mb: 5 }}>
          <Typography variant="h3" align="center" sx={{ mt: 5 }}>
            Reviews {userData?.user?.first_name} Has Received
          </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 10, mt: 10 }}
          >
            {userReviews.map((review) => (
              <ReviewCard
                name={review?.toPuppy?.name}
                ratingDescription={review?.text}
                ratingNum={review?.score}
                sender={review?.fromUser?.user?.username}
                image={
                  review?.toPuppy?.image.startsWith("/media")
                    ? `${apiUrl}${review?.toPuppy?.image}`
                    : review?.toPuppy?.image
                }
                // owner={review?.owner?.user?.first_name}
                profileSlug={review?.fromUser?.user?.username}
                dogId={review?.toPuppy?.id}
              />
            ))}
          </Grid>
        </Card>
      )}
      <Card>
        <Typography variant="h3" align="center">
          {userData?.user?.first_name}'s Info
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
              value={`${userData?.user?.first_name || "N/A  "} `}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 5, mr: 3 }}
            />
            <TextField
              disabled
              label="City"
              value={userData?.city || "N/A"}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 5, mr: 3 }}
            />
            <TextField
              disabled
              label="State"
              value={userData?.state || "N/A"}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 5, mr: 3 }}
            />
            <TextField
              disabled
              label="Street Address"
              value={userData?.street_address || "N/A"}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 5, mr: 3 }}
            />
            <TextField
              disabled
              label="Zip Code"
              value={userData?.zip_code || "N/A"}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 5, mr: 3 }}
            />
            <TextField
              disabled
              label="Available Times"
              value={
                userData
                  ? `${userData?.available_from}:00 - ${userData?.available_until}:00`
                  : "N/A"
              }
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 5, mr: 3 }}
            />
          </Grid>

          {userData?.latitude && userData?.longitude ? (
            <Grid item sm={8}>
              <MapWrapper
                center={{ lat: userData?.latitude, lng: userData?.longitude }}
                zoom={10}
              >
                <Stack direction="row">
                  <LocationOnIcon
                    sx={{
                      position: "absolute",
                      transform: "translate(-50%, -50%)",
                      fontSize: 40,
                    }}
                  />
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
          {!userData?.latitude && !userData?.longitude && (
            <Typography>
              Looks like {userData?.user?.first_name} hasn't shared his location
              yet
            </Typography>
          )}
        </Grid>
      </Card>
    </BaseProfile>
  );
};

export default BaseProfileView;
