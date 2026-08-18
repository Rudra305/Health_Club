import React from 'react'
import { Button, Form, Toast, ToastContainer, Col, Row, ButtonGroup } from 'react-bootstrap'
import { useHistory } from 'react-router'
import Select from 'react-select'
import { FaDumbbell, FaUser, FaLock, FaPhone, FaMapMarkerAlt, FaUserPlus, FaArrowLeft } from 'react-icons/fa'
import { signupTrainerApi, signupUsernApi } from '../../api/authentication'
import { fetchApiWrapper } from '../../api/FetchApiWrapper'

const initial = {
    username: "",
    password: "",
    houseNo: "",
    city: "",
    state: "",
    pincode: "",
    firstName: "",
    lastName: "",
    gender: "M",
    phoneNumber: '',
    facility: []
}

const SignupComponent = () => {
    const [errorMsg, setErrorMsg] = React.useState("")
    const [successMsg, setSuccessMsg] = React.useState("")
    const [isCustomer, setIsCustomer] = React.useState(true)
    const [loading, setLoading] = React.useState(false)
    const history = useHistory()

    React.useEffect(() => {
        if (window.localStorage.getItem("token") !== null && window.localStorage.getItem("role") !== null) {
            history.push('/')
        }
    }, [history])

    const options = [
        { label: "Gym Workout", value: "Gym" },
        { label: "Swimming Pool", value: "Swimming" },
        { label: "Yoga & Meditation", value: "Yoga" }
    ]
    const [values, setValues] = React.useState(initial)

    const onChnageInput = (event) => {
        const { value, name } = event.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const onSubmitValue = async (e) => {
        if (e) e.preventDefault()
        if (!values.username || !values.password || !values.firstName) {
            setErrorMsg("Please fill in the required fields (Username, Password, First Name)")
            return
        }

        setLoading(true)
        let statusCode, data
        if (isCustomer) {
            const customerPayload = {
                username: values.username,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                email: `${values.username}@example.com`,
                phone: values.phoneNumber,
                gender: values.gender,
                address: [{ houseNo: values.houseNo, city: values.city, state: values.state, pincode: values.pincode }],
                facility: values.facility.map(f => ({ facilityName: typeof f === 'string' ? f : f.value }))
            };
            [{ statusCode, data }] = await fetchApiWrapper(() => signupUsernApi(customerPayload));
        } else {
            const trainerPayload = {
                username: values.username,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                email: `${values.username}@example.com`,
                phone: values.phoneNumber,
                gender: values.gender,
                address: [{ houseNo: values.houseNo, city: values.city, state: values.state, pincode: values.pincode }],
                facility: { facilityName: values.facility[0]?.value || 'Gym' }
            };
            [{ statusCode, data }] = await fetchApiWrapper(() => signupTrainerApi(trainerPayload));
        }
        setLoading(false)

        if (statusCode === 200 || statusCode === 201) {
            setSuccessMsg("Account created successfully! Redirecting to login...")
            setValues(initial)
            setTimeout(() => history.push('/login'), 800)
        } else {
            setErrorMsg(typeof data === 'string' ? data : "Could not complete registration")
        }
    }

    return (
        <div className="auth-overlay">
            <div className="auth-card" style={{ maxWidth: "620px" }}>
                <div className="text-center mb-4">
                    <div
                        className="d-inline-flex align-items-center justify-content-center mb-2 shadow-sm"
                        style={{
                            width: "52px",
                            height: "52px",
                            background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                            borderRadius: "14px",
                            color: "#fff",
                            fontSize: "22px"
                        }}
                    >
                        <FaDumbbell />
                    </div>
                    <h3 className="fw-bold mb-1" style={{ color: "#0f172a", letterSpacing: "-0.02em" }}>
                        Create Account
                    </h3>
                    <p className="text-muted small mb-3">Join our health & fitness community</p>

                    {/* Role Selector Tabs */}
                    <ButtonGroup className="w-100 p-1 rounded-3" style={{ background: '#f1f5f9' }}>
                        <Button
                            variant={isCustomer ? "primary" : "light"}
                            className={`border-0 py-2 fw-semibold ${isCustomer ? 'shadow-sm' : 'text-muted'}`}
                            onClick={() => setIsCustomer(true)}
                        >
                            <FaUser className="me-1" /> Member Sign Up
                        </Button>
                        <Button
                            variant={!isCustomer ? "primary" : "light"}
                            className={`border-0 py-2 fw-semibold ${!isCustomer ? 'shadow-sm' : 'text-muted'}`}
                            onClick={() => setIsCustomer(false)}
                        >
                            <FaUserPlus className="me-1" /> Trainer Sign Up
                        </Button>
                    </ButtonGroup>
                </div>

                <Form onSubmit={onSubmitValue}>
                    <Row className="g-3 mb-3">
                        <Col md={6}>
                            <Form.Label className="small fw-semibold text-muted mb-1">Username *</Form.Label>
                            <Form.Control
                                placeholder="Choose username"
                                name="username"
                                value={values.username}
                                onChange={onChnageInput}
                                required
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label className="small fw-semibold text-muted mb-1"><FaLock className="me-1" /> Password *</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Create password"
                                name="password"
                                value={values.password}
                                onChange={onChnageInput}
                                required
                            />
                        </Col>
                    </Row>

                    <Row className="g-3 mb-3">
                        <Col md={6}>
                            <Form.Label className="small fw-semibold text-muted mb-1">First Name *</Form.Label>
                            <Form.Control
                                placeholder="First name"
                                name="firstName"
                                value={values.firstName}
                                onChange={onChnageInput}
                                required
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label className="small fw-semibold text-muted mb-1">Last Name</Form.Label>
                            <Form.Control
                                placeholder="Last name"
                                name="lastName"
                                value={values.lastName}
                                onChange={onChnageInput}
                            />
                        </Col>
                    </Row>

                    <Row className="g-3 mb-3">
                        <Col md={6}>
                            <Form.Label className="small fw-semibold text-muted mb-1"><FaPhone className="me-1" /> Mobile Number</Form.Label>
                            <Form.Control
                                placeholder="10-digit number"
                                name="phoneNumber"
                                value={values.phoneNumber}
                                onChange={onChnageInput}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label className="small fw-semibold text-muted mb-1">Gender</Form.Label>
                            <Form.Select name="gender" value={values.gender} onChange={onChnageInput}>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row className="g-3 mb-3">
                        <Col md={6}>
                            <Form.Label className="small fw-semibold text-muted mb-1"><FaMapMarkerAlt className="me-1" /> City</Form.Label>
                            <Form.Control
                                placeholder="City"
                                name="city"
                                value={values.city}
                                onChange={onChnageInput}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label className="small fw-semibold text-muted mb-1">State</Form.Label>
                            <Form.Control
                                placeholder="State"
                                name="state"
                                value={values.state}
                                onChange={onChnageInput}
                            />
                        </Col>
                    </Row>

                    <Form.Group className="mb-4">
                        <Form.Label className="small fw-semibold text-muted mb-1">
                            {isCustomer ? "Select Activities to Enroll:" : "Trainer Primary Specialization:"}
                        </Form.Label>
                        <Select
                            isMulti={isCustomer}
                            options={options}
                            onChange={(val) => setValues({ ...values, facility: isCustomer ? val : [val] })}
                            placeholder="Select facility (Gym, Yoga, Swimming)"
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        className="w-100 py-2 fw-bold"
                        variant="primary"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : `Register as ${isCustomer ? 'Member' : 'Trainer'}`}
                    </Button>
                </Form>

                <div className="text-center mt-3 pt-3 border-top">
                    <a href="/login" className="small text-muted text-decoration-none d-inline-flex align-items-center">
                        <FaArrowLeft className="me-1" /> Back to Sign In
                    </a>
                </div>
            </div>

            <ToastContainer className="p-3" position="bottom-end">
                <Toast show={errorMsg !== ""} autohide delay={5000} onClose={() => setErrorMsg("")} bg="danger">
                    <Toast.Header closeButton><strong className="me-auto">Error</strong></Toast.Header>
                    <Toast.Body className="text-white">{errorMsg}</Toast.Body>
                </Toast>

                <Toast show={successMsg !== ""} autohide delay={4000} onClose={() => setSuccessMsg("")} bg="success">
                    <Toast.Header closeButton><strong className="me-auto">Success</strong></Toast.Header>
                    <Toast.Body className="text-white">{successMsg}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}

export default SignupComponent