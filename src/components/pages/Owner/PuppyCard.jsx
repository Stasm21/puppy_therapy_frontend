import { useEffect } from "react";
import { useStore } from "../../../store/Store";
import {
  Card,
  CardActionArea,
  Typography,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import { apiUrl } from "../../../store/siteurl";
import NoLink from "../../utilComp/NoLink";
import { routes } from "../../Routes/routes";
const PuppyCard = ({
  name,
  age,
  breed,
  description,
  image,
  owner,
  price,
  vaccinated,
  id,
}) => {
  return (
    <Card
      sx={{
        width: {
          xs: 200,
          sm: 250,
          xl: 300,
        },
      }}
    >
      <NoLink to={id && `${routes.singlePupWithId}/${id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{
              height: {
                xs: 130,
                sm: 200,
                xl: 200,
              },
            }}
            image={image}
            image={image.startsWith("/media") ? `${apiUrl}${image}` : image}
            alt={name}
          />
          <CardContent>
            <Grid container justifyContent="space-around">
              <Grid item xs={8}>
                <Typography gutterBottom variant="h5" component="div">
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography gutterBottom variant="body1" component="div">
                  {breed}
                </Typography>
              </Grid>
              <NoLink
                to={`${routes.singleProfileWithId}/${owner?.user?.username}`}
              >
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    Owner : {owner?.user?.username}
                  </Typography>
                </Grid>
              </NoLink>
            </Grid>
            <Grid>
              <Typography gutterBottom variant="body2" component="div">
                {age || "Age: N/A"}
              </Typography>
              <Typography gutterBottom variant="body2" component="div">
                {price ? `${price} per hour` : "Price: N/A"}
              </Typography>
            </Grid>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              {description || "N/A"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </NoLink>
    </Card>
  );
};

export default PuppyCard;
