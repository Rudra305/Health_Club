import { useState } from "react";
import { useHistory } from "react-router";
import { Card, Form, Button, Toast, ToastContainer } from "react-bootstrap";
import { getUserAuthTokenApi } from "../../api/authentication";
import { fetchApiWrapper } from "../../api/FetchApiWrapper";
import { StyledContainer, StyledCard, Background } from "./styles";

const LoginComponent = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const history = useHistory();

  useState(() => {
    if (
      window.localStorage.getItem("token") !== null ||
      window.localStorage.getItem("role") !== null
    ) {
      history.push("/");
    }
  }, []);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const onChnageInput = (event) => {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onSubmitValue = async () => {
    const [{ statusCode, data }] = await fetchApiWrapper(
      () => getUserAuthTokenApi(values.username, values.password),
      "Please provide valid credentials!!!"
    );
    if (statusCode === 200) {
      window.localStorage.setItem("token", "Bearer " + data.jwt);
      window.localStorage.setItem("role", data.role);
      window.localStorage.setItem("username", data.username);
      setSuccessMsg("Login Successfull !!");
      history.push("/");
    } else {
      setErrorMsg(data);
    }
  };

  return (
    <Background>
      <StyledContainer>
        <StyledCard className="py-4 shadow-lg">
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  placeholder="Enter User Name"
                  name={"username"}
                  value={values.username}
                  onChange={onChnageInput}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name={"password"}
                  value={values.password}
                  onChange={onChnageInput}
                />
              </Form.Group>
              <Button variant="primary" onClick={onSubmitValue}>
                Submit
              </Button>
            </Form>
            <a className="mt-4" href={"/signup"}>
              {" "}
              New user Sign Up!
            </a>
          </Card.Body>
        </StyledCard>
      </StyledContainer>
      <ToastContainer className="p-3" position="bottom-end">
        <Toast
          show={errorMsg !== ""}
          autohide={5000}
          onClose={() => setErrorMsg("")}
          bg={"danger"}
        >
          <Toast.Header closeButton={true}>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Old Password entered was incorrect
          </Toast.Body>
        </Toast>

        <Toast
          show={successMsg !== ""}
          autohide={5000}
          onClose={() => setSuccessMsg("")}
          bg={"success"}
        >
          <Toast.Header closeButton={true}>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Login Successfull</Toast.Body>
        </Toast>
      </ToastContainer>
    </Background>
  );
};

export default LoginComponent;
