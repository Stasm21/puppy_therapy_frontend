import { useState, useEffect } from "react";
import { useStore } from "../../../store/Store";
import { Container, Box } from "@mui/material";
import BackgroundPaper from "../../utilComp/BackgroundPaper";

const BaseProfile = (props) => {
  const userInfo = useStore((state) => state.userInfo);
  const setUserInfo = useStore((state) => state.setUserInfo);
  const accessToken = useStore((state) => state.accessToken);

  useEffect(() => {
    setUserInfo(accessToken);
  }, []);

  return (
    <BackgroundPaper>
      <Container>{props.children}</Container>
    </BackgroundPaper>
  );
};

export default BaseProfile;
