import axios from "axios";
import React, { useState, useEffect } from "react";
import { apiUrl } from "../../../store/siteurl";
import BackgroundPaper from "../../utilComp/BackgroundPaper";
import {
  Button,
  Card,
  Typography,
  Stack,
  Box,
  CardMedia,
  Grid,
  TextField,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useStore } from "../../../store/Store";
import NoLink from "../../utilComp/NoLink";
import { routes } from "../../Routes/routes";
import PuppyCard from "../Owner/PuppyCard";
import MapWrapper from "../../Map/MapWrapper";

const AllPuppies = () => {
  const [puppies, setPuppies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [breed, setBreed] = useState("");
  const [preferences, setPreferences] = useState("");
  const [showNearToggle, setShowNearToggle] = useState(false);
  const userInfo = useStore((state) => state.userInfo);
  const accessToken = useStore((state) => state.accessToken);

  useEffect(() => {
    getPuppy();
  }, []);

  const getPuppy = () => {
    setLoading(true);

    axios.defaults.headers.common["Authorization"] =
      accessToken && `Bearer ${accessToken}`;
    axios
      .get(`${apiUrl}/api/get-puppies/`, {
        params: {
          breed,
          preferences: searchValue,
          longitude: showNearToggle ? userInfo?.longitude : null,
          latitude: showNearToggle ? userInfo?.latitude : null,
        },
      })
      .then((res) => {
        setLoading(false);
        setPuppies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPuppy();
  }, [breed, searchValue, showNearToggle]);

  return (
    <BackgroundPaper>
      <Typography variant="h4" align="center" sx={{ marginBottom: 1 }}>
        View All Puppies
      </Typography>

      <Card raised={true} sx={{ mb: 3, minHeight: "80vh" }}>
        {puppies && (
          <Grid container justifyContent="center" alignItems="center">
            <Grid item sm={8}>
              <MapWrapper
                center={{ lat: userInfo?.latitude, lng: userInfo?.longitude }}
                zoom={10}
              >
                {puppies.map(
                  (puppy) =>
                    puppy?.owner?.latitude &&
                    puppy?.owner?.longitude && (
                      <Stack
                        direction="row"
                        lat={puppy.owner.latitude}
                        lng={puppy.owner.longitude}
                      >
                        <LocationOnIcon
                          sx={{
                            fontSize: 40,
                          }}
                        />
                        <Typography sx={{ mt: 2 }}>You're here</Typography>
                      </Stack>
                    )
                )}
              </MapWrapper>
            </Grid>
          </Grid>
        )}
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <TextField
            label="Search By Preferences"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            variant="filled"
            size="small"
            sx={{ mr: 2 }}
          />
          <TextField
            label="Search By Breed"
            value={breed}
            onChange={(event) => setBreed(event.target.value)}
            variant="filled"
            size="small"
          />
        </Grid>
        <Grid
          container
          spacing={3}
          justifyContent="space-around"
          sx={{
            padding: {
              xs: 3,
              sm: 5,
              lg: 20,
            },
          }}
        >
          {puppies.map((puppy) => (
            <Grid item>
              <PuppyCard
                name={puppy.name}
                age={puppy.age}
                breed={puppy.breed}
                description={puppy.description}
                image={puppy.image}
                owner={puppy.owner}
                price={puppy.price}
                vaccinated={puppy.vaccinated}
                id={puppy.id}
              />
            </Grid>
          ))}
          {puppies.length == 0 && (
            <Stack justifyContent="center" alignItems="center" spacing={5}>
              <CardMedia
                component="img"
                sx={{ width: "300px" }}
                src="/sad-pup.jpg"
              />
              <Typography variant="h2">No puppies found.</Typography>
              <NoLink to={routes.ownerPostPuppy}>
                <Typography variant="h4"> Post a puppy</Typography>
              </NoLink>
            </Stack>
          )}
        </Grid>
      </Card>
    </BackgroundPaper>
  );
};

export default AllPuppies;
