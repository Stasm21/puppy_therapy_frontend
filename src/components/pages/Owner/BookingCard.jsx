import {
  Card,
  CardActionArea,
  Button,
  Typography,
  CardMedia,
  CardActions,
  CardContent,
  Grid,
  ButtonBase,
  Stack,
  TextField,
  Rating,
} from "@mui/material";
import { apiUrl } from "../../../store/siteurl";
import { useStore } from "../../../store/Store";
import { routes } from "../../Routes/routes";
import NoLink from "../../utilComp/NoLink";
import { useState } from "react";
import axios from "axios";
const BookingCard = ({ bookingInfo, accept, deny }) => {
  const userInfo = useStore((state) => state.userInfo);
  const [postRating, setPostRating] = useState(5);
  const [postReview, setPostReview] = useState("");
  const [leaveReview, setLeaveReview] = useState(false);

  const saveReview = () => {
    let info = {
      score: postRating,
      text: postReview,
      fromUser: userInfo?.id,
      toPuppy: bookingInfo?.puppy?.id,
      owner: bookingInfo?.owner?.id,
    };
    axios
      .post(`${apiUrl}/api/renterReviews/`, info)
      .then((res) => {
        console.log(res.data);
        setLeaveReview(true);
      })
      .catch((err) => {
        setLeaveReview(true);
      });
  };
  return (
    <Card
      sx={{
        width: {
          xs: 200,
          sm: 250,
          xl: 400,
        },
      }}
    >
      <CardActionArea>
        <NoLink to={`${routes.singlePupWithId}/${bookingInfo?.puppy?.id}`}>
          <CardMedia
            component="img"
            sx={{
              height: {
                xs: 130,
                sm: 200,
                xl: 200,
              },
            }}
            image={
              bookingInfo?.puppy?.image.startsWith("/media")
                ? `${apiUrl}${bookingInfo?.puppy?.image}`
                : bookingInfo?.puppy?.image
            }
            alt={bookingInfo?.puppy?.name}
          />
          <CardContent>
            <Grid item xs={12}>
              {userInfo?.userType == "Owner" && (
                <Typography gutterBottom variant="h6" component="div">
                  Appointment Request from{" "}
                  {bookingInfo?.enthusiast?.user?.first_name || "N/A"}
                </Typography>
              )}
              {userInfo?.userType == "Renter" && (
                <Typography gutterBottom variant="h6" component="div">
                  Appointment Request to{" "}
                  {bookingInfo?.owner?.user?.first_name || "N/A"}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="body"
                component="div"
                sx={{ mt: 2 }}
              >
                Proposed Date : {bookingInfo?.date || "N/A"}
              </Typography>
              <Typography
                gutterBottom
                variant="body"
                component="div"
                sx={{ mt: 2 }}
              >
                Time : {bookingInfo?.timeslot || "N/A"}:00
              </Typography>
            </Grid>
          </CardContent>
        </NoLink>
      </CardActionArea>
      {bookingInfo?.accepted === 0 && userInfo?.userType == "Owner" && (
        <CardActions>
          <Button size="small" color="primary" onClick={accept} fullWidth>
            Accept
          </Button>
          <Button size="small" color="primary" onClick={deny} fullWidth>
            Deny
          </Button>
        </CardActions>
      )}
      {bookingInfo?.accepted === 1 ? (
        <Stack>
          <Typography variant="h6" align="center" sx={{ mb: 3 }}>
            Accepted
          </Typography>
          {userInfo?.userType == "Renter" && !leaveReview && (
            <Button variant="contained" onClick={() => setLeaveReview(true)}>
              Post a review
            </Button>
          )}

          {leaveReview && (
            <Stack spacing={1}>
              <Rating
                value={postRating}
                onChange={(event, newValue) => {
                  setPostRating(newValue);
                }}
                sx={{ mt: 1 }}
              />
              <TextField
                label="Post your review"
                value={postReview}
                onChange={(event) => setPostReview(event.target.value)}
                variant="filled"
                size="small"
                sx={{ mt: 1 }}
              />
              <Button variant="contained" onClick={() => saveReview()}>
                Save
              </Button>
            </Stack>
          )}
        </Stack>
      ) : (
        bookingInfo?.accepted === 2 && (
          <Typography variant="h6" align="center" sx={{ mb: 3 }}>
            Denied
          </Typography>
        )
      )}
    </Card>
  );
};

export default BookingCard;
