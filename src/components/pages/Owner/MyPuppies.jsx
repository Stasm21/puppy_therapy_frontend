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
} from "@mui/material";
import { useStore } from "../../../store/Store";
import PuppyCard from "./PuppyCard";
import NoLink from "../../utilComp/NoLink";
import { routes } from "../../Routes/routes";

const MyPuppy = () => {
  const [puppies, setPuppies] = useState([]);
  const [loading, setLoading] = useState(false);

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
      .get(`${apiUrl}/api/ownerPuppies/`)
      .then((res) => {
        setLoading(false);
        setPuppies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BackgroundPaper>
      <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>
        All your puppies
      </Typography>
      <Card raised={true} sx={{ mb: 5, minHeight: "80vh" }}>
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

export default MyPuppy;
