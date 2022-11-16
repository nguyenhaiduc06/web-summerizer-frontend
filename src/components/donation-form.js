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
import { useEffect, useState } from "react";
import dotPattern from "assets/images/dot-pattern.png";
import axios from "axios";

const SummarizeForm = ({ setText }) => {
  const handleUR = React.useRef();
  var [state, setState] = useState({
    source: "viaLink",
    numOfSentences: "",
  });

  function handleSource(e) {
    setState({
      ...state,
      source: e.target.value,
    })
  };

  var [url, setUrl] = useState({
    url: ""
  });

  const handleURL = (e) => {
    setUrl({
      url: e.target.value,
    });
  };

  var [file, setFile] = useState({
    fileContent: "",
  });

  const handleFile = (e) => {
    const reader = new FileReader()
    reader.onerror = error => reject(error)
    reader.readAsText(e.target.files[0])
      setFile({
        fileContent: reader,
      })
  };

  var [box, setBox] = useState({
    inputBox: <Box sx={styles.input}>
      <Label htmlFor="url" variant="styles.srOnly">
        Summarize
      </Label>
      <Input
        id="url"
        type="text"
        placeholder="Put your url here"
        onChange={handleURL}
      />
    </Box>
  });

  function handleRadio(e) {
    if (e.target.value == "viaLink") {
      setBox({
        inputBox:
          <Box sx={styles.input}>
            <Label htmlFor="url" variant="styles.srOnly">
              Summarize
            </Label>
            <Input
              id="url"
              type="text"
              placeholder="Put your url here"
              onChange={handleURL}
            />
          </Box>
      });
    }
    else if (e.target.value == "local") {
      setBox({
        inputBox:
          <Box sx={styles.input}>
            <Label htmlFor="files" variant="styles.srOnly">
              Summarize
            </Label>
            <Input
              id="files"
              type="file"
              accept=".txt"
              size="1"
              onChange={handleFile}
            />
          </Box>
      });
    };
  };

  function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
      textbox.addEventListener(event, function (e) {
        if (inputFilter(this.value)) {
          if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
            this.classList.remove("input-error");
            this.setCustomValidity("");
          }
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.classList.add("input-error");
          this.setCustomValidity(errMsg);
          this.reportValidity();
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
        else {
          this.value = "";
        }
      });
    });
  }



  const handleNumOfSentences = (e) => {
    setInputFilter(document.getElementById("numOfSentences"), function (value) {
      return /^\d*\.?\d*$/.test(value);
    });
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
    if (state.source == "viaLink") {
      var response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content?url=${url.url}&params=${state.source + " " + state.numOfSentences}`
      );
    }
    if (state.source == "local") {
      var response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content?data=${file.fileContent.result}&params=${state.source + " " + state.numOfSentences}`
      );
    }
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
              onChange={e => { handleSource(e); handleRadio(e) }}
            />
            Via Link
          </Label>
          <Label>
            <Radio
              value="local"
              name="source"
              onChange={e => { handleSource(e); handleRadio(e) }}
            />
            Local
          </Label>
        </Box>
        {box.inputBox}
        <Box sx={styles.input}>
          <Label htmlFor="numOfSentences" variant="styles.srOnly">
            Summarize
          </Label>
          <Input
            id="numOfSentences"
            type="text"
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
