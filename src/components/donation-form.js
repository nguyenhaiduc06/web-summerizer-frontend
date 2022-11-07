/** @jsx jsx */
import {
  jsx,
  Box,
  Text,
  Radio,
  Image,
  Label,
  Input,
  Button,
  Heading,
  Checkbox,
} from "theme-ui";
import { rgba } from "polished";
import { useState } from "react";

import dotPattern from "assets/images/dot-pattern.png";

import axios from "axios";

const SummarizeForm = ({ setText }) => {
  const [state, setState] = useState({
    source: "viaLink",
    url: "",
    numOfSentences: "",
  });
  const handleSource = (e) => {
    setState({
      ...state,
      source: e.target.value,
    });
  };

  const handleURL = (e) => {
    setState({
      ...state,
      url: e.target.value,
    });
  };

  const handleNumOfSentences = (e) => {
    setState({
      ...state,
      numOfSentences: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "🚀 ~ process.env.NEXT_PUBLIC_API_ENDPOINT",
      process.env.NEXT_PUBLIC_API_ENDPOINT
    );
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content?url=${state.url}?${" " + state.numOfSentences}`
    );
    setText(response.data);
  };

  return (
    <Box sx={styles.formWrapper}>
      <Heading sx={styles.title}>Tool Box</Heading>
      <Box as="form" sx={styles.form} onSubmit={handleSubmit}>
        <Box sx={styles.radioGroup}>
          <Label>
            <Radio
              value="viaLink"
              name="source"
              defaultChecked={state.source === "viaLink"}
              onChange={handleSource}
            />
            Via Link
          </Label>

          <Label>
            <Radio
              value="local"
              name="source"
              defaultChecked={state.source === "local"}
              onChange={handleSource}
            />
            Local
          </Label>
        </Box>
        <Box sx={styles.input}>
          <Label htmlFor="url" variant="styles.srOnly">
            Summarize
          </Label>
          <Input
            id="url"
            placeholder="Summarize"
            onChange={handleURL}
          />
        </Box>
        <Box sx={styles.input}>
          <Label htmlFor="numOfSentences" variant="styles.srOnly">
            Summarize
          </Label>
          <Input
            id="numOfSentences"
            placeholder="The willing number of sentences "
            onChange={handleNumOfSentences}
          />
        </Box>
        <Box sx={styles.buttonGroup}>
          <Button variant="primary" sx={styles.submit}>
            Summarize
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SummarizeForm;

const styles = {
  formWrapper: {
    borderRadius: 10,
    backgroundColor: "white",
    boxShadow: "0px 24px 50px rgba(54, 91, 125, 0.05)",
    p: ["26px", null, null, "35px 40px 50px"],
    position: "relative",
    "::before, ::after": {
      background: `url(${dotPattern}) no-repeat right top`,
      content: [null, null, null, null, null, `''`],
      position: "absolute",
      width: 302,
      height: 347,
      zIndex: -1,
    },
    "::before": {
      left: "-60px",
      bottom: 15,
    },
    "::after": {
      right: "-41px",
      top: "-30px",
    },
  },
  title: {
    color: "textSecondary",
    fontWeight: "bold",
    fontSize: [6, null, null, 12, 8, 11],
    lineHeight: 1.4,
    letterSpacing: "heading",
    mb: [4, null, null, 5],
    textAlign: ["center", null, null, null, "left"],
  },
  form: {
    label: {
      alignItems: "center",
      cursor: "pointer",
      fontWeight: 400,
    },
  },
  radioGroup: {
    display: "flex",
    alignItems: ["flex-start", null, null, "center"],
    flexDirection: ["column", null, null, "row"],
    mb: [5, null, null, 5],
    "> label": {
      alignItems: "center",
      fontSize: [1, null, null, "15px"],
      width: "auto",
      "+ label": {
        ml: [null, null, null, 4],
        mt: [2, null, null, 0],
      },
    },
  },
  buttonGroup: {
    mt: [5, null, null, 8],
    span: {
      display: "flex",
      justifyContent: "center",
      color: rgba("#000", 0.4),
      fontWeight: "bold",
      fontSize: 1,
      lineHeight: 2.87,
    },
    button: {
      minHeight: [45, null, null, 60, 50, 60],
      width: "100%",
    },
  },
  input: {
    mb: [3, null, null, 4],
    input: {
      minHeight: [45, null, null, 60, 50, 60],
      "::placeholder": {
        color: rgba("#02073E", 0.35),
      },
    },
  },
};
