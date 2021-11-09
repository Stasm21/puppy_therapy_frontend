import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { apiUrl } from "../../../store/siteurl";
import BackgroundPaper from "../../utilComp/BackgroundPaper";
import {
  Button,
  Card,
  TextField,
  Typography,
  Stack,
  Snackbar,
  Box,
  CardMedia,
  InputAdornment,
  OutlinedInput,
  FormControl,
  FormControlLabel,
  Switch,
  Alert,
} from "@mui/material";
import Dropzone from "react-dropzone";
import { useStore } from "../../../store/Store";
const PostPuppy = () => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [vaccinated, setVaccinated] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const userInfo = useStore((state) => state.userInfo);

  const [openSnack, setOpenSnack] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    postPuppy();
  };

  const postPuppy = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("age", age);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("vaccinated", vaccinated);
    formData.append("owner", userInfo?.id);
    formData.append("breed", breed);

    axios
      .post(`${apiUrl}/api/ownerPuppies/`, formData)
      .then((res) => {
        console.log(res);
        setAge(0);
        setName(0);
        setBreed("");
        setDescription("");
        setImage(null);
        setImageFile(null);
        setPrice("");
        setVaccinated(false);
        setOpenSnack(true);
        setError(false);
      })
      .catch((err) => {
        setOpenSnack(true);
        setError(true);

        console.log(err);
      });
  };

  const onPhotoDrop = (file) => {
    file.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        setImageFile(reader.result);
        setImage(file);
      };
      if (file && file.type.includes("image") && !file.type.includes("gif")) {
        reader.readAsDataURL(file);
      }
    });
  };
  return (
    <BackgroundPaper>
      <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>
        Add your puppy
      </Typography>
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
      <FormControl
        sx={{
          display: "grid",
          placeItems: "center",
          //   justifyContent: "center",
        }}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Card sx={{ padding: "10px 50px 20px 50px" }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={10}
          >
            <Dropzone onDrop={onPhotoDrop}>
              {({ getRootProps, getInputProps }) => (
                <Box {...getRootProps()}>
                  <input {...getInputProps()} />
                  {imageFile ? (
                    <CardMedia component="img" height="150" image={imageFile} />
                  ) : (
                    <Box>
                      <CardMedia
                        component="img"
                        height="150"
                        image={"/placeholder.jpg"}
                      />
                      <Typography variant="h6" align="center">
                        Drop a picture of your dog
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Dropzone>
            <Stack>
              <br />
              <TextField
                name="breed"
                value={breed}
                placeholder="Set Breed"
                label="Breed"
                onChange={(event) => setBreed(event.target.value)}
                required
              />
              <br />

              <TextField
                value={age}
                placeholder="Age"
                label="Age"
                onChange={(event) => setAge(event.target.value)}
                required
              />
              <br />

              <OutlinedInput
                type="number"
                value={price}
                placeholder="Set Price"
                onChange={(event) => setPrice(event.target.value)}
                required
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
              <br />
            </Stack>
          </Stack>
          <br />
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Stack spacing={5} direction="row">
              <TextField
                name="name"
                value={name}
                placeholder="Enter Puppy Name"
                label="Puppy Name"
                onChange={(event) => setName(event.target.value)}
                required
                fullWidth
              />
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    onChange={() => {
                      setVaccinated(!vaccinated);
                    }}
                  />
                }
                label="Is Your Dog Vaccinated?"
                labelPlacement="bottom"
              />
            </Stack>
            <TextField
              type="text"
              value={description}
              placeholder="Description"
              label="Description"
              multiline
              rows={4}
              fullWidth
              onChange={(event) => setDescription(event.target.value)}
              required
            />
            <FormControlLabel
              control={
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={
                    name && breed && age && description && price ? false : true
                  }
                >
                  Add Puppy
                </Button>
              }
              label={
                name && breed && age && description && price
                  ? ""
                  : "Please complete all fields"
              }
              labelPlacement="bottom"
            />
          </Stack>
          <br />
        </Card>
      </FormControl>
    </BackgroundPaper>
  );
};

export default PostPuppy;
