import { useEffect } from "react";
import { useStore } from "../../../store/Store";
import {
  Card,
  CardActionArea,
  Typography,
  CardMedia,
  CardContent,
  Grid,
  Rating,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import NoLink from "../../utilComp/NoLink";
import { routes } from "../../Routes/routes";

const ReviewCard = ({
  name,
  image,
  sender,
  ratingDescription,
  ratingNum,
  owner,
  profileSlug,
  dogId,
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
      <NoLink to={`${routes.singlePupWithId}/${dogId}`}>
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
            alt={name}
          />

          <CardContent>
            <Grid container justifyContent="center">
              <Grid item xs={8}>
                <Rating
                  name="text-feedback"
                  value={ratingNum}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </Grid>
            </Grid>
            <NoLink to={`${routes.singleProfileWithId}/${profileSlug}`}>
              <Typography gutterBottom variant="body1" component="div">
                {owner ? `Owner ${owner}` : `By ${sender}`}
              </Typography>
            </NoLink>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              {ratingDescription}
            </Typography>
          </CardContent>
        </CardActionArea>
      </NoLink>
    </Card>
  );
};

export default ReviewCard;
