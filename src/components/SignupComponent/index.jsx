import React from 'react'
import { Button, Card, Form, Toast, ToastContainer, Col, Row, InputGroup, FormControl } from 'react-bootstrap'
import { useHistory } from 'react-router'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { signupTrainerApi, signupUsernApi } from '../../api/authentication'
import { fetchApiWrapper } from '../../api/FetchApiWrapper'
import { Background, StyledCard, StyledContainer } from '../LoginComponent/styles'


const initial = {
    username: "",
    password: "",
    houseNo: "",
    city: "",
    state: "",
    pincode: "",
    firstName: "",
    gender: "",
    lastName: "",
    phoneNumber: '',
    gender: '',
    facility: []
}
const SignupComponent = props => {
    const [errorMsg, setErrorMsg] = React.useState("")
    const [successMsg, setSuccessMsg] = React.useState("")
    const [isCustomer, setIsCustomer] = React.useState(true)
    const history = useHistory()

    React.useEffect(() => {
        if (window.localStorage.getItem("token") !== null || window.localStorage.getItem("role") !== null) {
            history.push('/')
        }
    }, [])
    const options = [{ label: "Gym", value: "gym" }, { label: "Swimming", value: "swimming" }, { label: "Yoga", value: "yoga" }]
    const [values, setValues] = React.useState(initial)

    const onChnageInput = (event) => {
        const { value, name } = event.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const onSubmitValue = async () => {
        let statusCode, data
        if (isCustomer)
            [{ statusCode, data },] = await fetchApiWrapper(() => signupUsernApi(createUserDto()));
        else
            [{ statusCode, data },] = await fetchApiWrapper(() => signupTrainerApi(createTrainerDto()));


        if (statusCode === 200) {
            setSuccessMsg("Successfull")
            setValues(initial)
        }
        else {
            setErrorMsg(data)
        }

    }

    const createUserDto = () => {
        return {
            "active": true,
            "address": [
                {
                    "city": values.city,
                    "houseNo": values.houseNo,
                    "pinCode": values.pincode,
                    "state": values.state
                }
            ],
            "facility": values.facility.map(x => { return { "facilityName": x.value } }),
            "firstName": values.firstName,
            "gender": "M",
            "lastName": values.lastName,
            "mobileNo": values.phoneNumber,
            "password": values.password,
            "username": values.username
        }
    }

    const createTrainerDto = () => {
        return {
            "active": true,
            "address": [
                {
                    "city": values.city,
                    "houseNo": values.houseNo,
                    "pinCode": values.pincode,
                    "state": values.state
                }
            ],
            "facility": { facilityName: values.facility[0].value },
            "firstName": values.firstName,
            "gender": "M",
            "lastName": values.lastName,
            "mobileNo": values.phoneNumber,
            "password": values.password,
            "username": values.username
        }
    }

    const animatedComponents = makeAnimated();

    return <Background>
        <StyledContainer>
            <StyledCard className="py-4 shadow-lg w-50">
                <Card.Body >
                    <Form>
                        <Form.Group className="mb-3">
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control placeholder="Enter first Name" name={"firstName"} value={values.firstName} onChange={onChnageInput} />
                                </Col>
                                <Col md>
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control placeholder="Enter last Name" name={"lastName"} value={values.lastName} onChange={onChnageInput} />
                                </Col>
                            </Row>
                        </Form.Group>
                        {/* <Form.Group className="mb-3">
                          
                        </Form.Group> */}
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control placeholder="Enter Phone Number" name={"phoneNumber"} value={values.phoneNumber} onChange={onChnageInput} />
                        </Form.Group>
                        <Row className="g-2">
                            <Col md>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control placeholder="Enter User Name" name={"username"} value={values.username} onChange={onChnageInput} />
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name={"password"} value={values.password} onChange={onChnageInput} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Row className="g-7">
                                <Col md={4}>
                                    <Form.Control className="mb-1" placeholder="House No" name={"houseNo"} value={values.houseNo} onChange={onChnageInput} />
                                </Col>
                                <Col md={8}>
                                    <Form.Control className="mb-1" placeholder="City" name={"city"} value={values.city} onChange={onChnageInput} />
                                </Col>
                            </Row>
                            <Row className="g-7">
                                <Col md={8}>
                                    <Form.Control className="mb-1" placeholder="State" name={"state"} value={values.state} onChange={onChnageInput} />
                                </Col>
                                <Col md={4}>
                                    <Form.Control className="mb-1" placeholder="PIN code" name={"pincode"} value={values.pincode} onChange={onChnageInput} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Row className="g-7">

                            <Col md={6} sm={12} xs={12}>
                                <Form.Label>Gender</Form.Label><br />
                                <Form.Check
                                    inline
                                    value="M"
                                    label="Male"
                                    name="gender"
                                    onChange={onChnageInput}
                                    type='radio'
                                />
                                <Form.Check
                                    inline
                                    value="F"
                                    label="Female"
                                    name="gender"
                                    type='radio'
                                    onChange={onChnageInput}
                                />
                            </Col>
                            <Col md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Facility</Form.Label>
                                    <Select
                                        closeMenuOnSelect={false}
                                        value={values.facility}
                                        // components={animatedComponents}
                                        isMulti={isCustomer}
                                        options={options}
                                        onChange={e => setValues({ ...values, facility: [].concat(e) })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>


                        <Form.Group className="mb-3">
                            <Form.Label>Sign up as</Form.Label>
                            <Form.Select onChange={(e) => setIsCustomer(e.target.value === 'Customer')}>
                                <option value="Customer">Customer</option>
                                <option value="Trainer">Trainer</option>
                            </Form.Select>
                        </Form.Group>
                        <div className='text-center'>
                            <Button variant="primary" onClick={onSubmitValue} >
                                SIGN UP
                            </Button>
                            <div>
                                <a className='mt-4' href={'/login'}> Already a user!</a>
                            </div>
                        </div>
                    </Form>

                </Card.Body>
            </StyledCard>

        </StyledContainer>
        <ToastContainer className="p-3" position="bottom-end">
            <Toast show={errorMsg !== ""} autohide={5000} onClose={() => setErrorMsg("")} bg={'danger'}>
                <Toast.Header closeButton={true}>
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body className="text-white">
                    {errorMsg}
                </Toast.Body>
            </Toast>

            <Toast show={successMsg !== ""} autohide={5000} onClose={() => setSuccessMsg("")} bg={'success'}>
                <Toast.Header closeButton={true}>
                    <strong className="me-auto">Success</strong>
                </Toast.Header>
                <Toast.Body className="text-white">
                    Registration Successfull !!
                </Toast.Body>
            </Toast>
        </ToastContainer>
    </Background>
}

export default SignupComponent