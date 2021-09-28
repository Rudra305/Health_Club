import React from 'react'
import { Badge, Button, Card, Col, Form, Row, Toast, ToastContainer } from "react-bootstrap"
import { changePasswordTrainerApi, changePasswordUserApi } from '../../api/authentication'
import { fetchApiWrapper } from '../../api/FetchApiWrapper'
import { Image, ProfileField } from './styles'

const ProfileComponent = ({ userData = {} }) => {
    const [newPassword1, setNewPassword1] = React.useState('')
    const [newPassword2, setNewPassword2] = React.useState('')

    const [showOldPasswordToast, setShowOldPasswordToast] = React.useState('')
    const [showPasswordsDontMatchToast, setShowPasswordsDontMatchToast] = React.useState(false)
    const [showPasswordChangedToast, setShowPasswordChangedToast] = React.useState(false)
    const role = window.localStorage.getItem("role");
    const doPasswordsMatch = () => newPassword1 === newPassword2

    const handleSubmit = async e => {
        e.preventDefault()
        let valid = true

        if (!doPasswordsMatch()) {
            setShowPasswordsDontMatchToast(true)
            valid = false
        }
        // fetch and check if oldPasswordMatch
        if (Math.random() * 10 > 8) {
            setShowOldPasswordToast(true)
            valid = false
        }

        if (valid === true) {
            const [{ statusCode, data }, error] =
                (role === 'TRAINER') ? await fetchApiWrapper(() => changePasswordTrainerApi(window.localStorage.getItem("username"), newPassword1), "Please provide valid credentials!!!")
                    : await fetchApiWrapper(() => changePasswordUserApi(window.localStorage.getItem("username"), newPassword1), "Please provide valid credentials!!!");
            console.log(statusCode, data, error)
            if (statusCode === 200) {
                setShowPasswordChangedToast(true)
                setNewPassword1('')
                setNewPassword2('')
            }
            else {
                setShowOldPasswordToast(data?data:"Something went wrong")
            }
        }

    }
    const getAddress = () => {
        if (userData.address) {
            if (userData.address[0])
                return <b>{userData.address[0].houseNo + ', ' + userData.address[0].city + ', ' + userData.address[0].state}<br /> {userData.address[0].pinCode}</b>
        }
        return ''
    }
    return <>
        <h4 className="mb-4">Profile</h4>
        <Row>
            <Col xs={12} xl={6}>
                <Card className="shadow mb-4">
                    <Card.Body className="d-flex flex-column flex-md-row">
                        <Image src="/user.png" className="align-self-center" />
                        <div className="flex-grow-1 h-100 p-4">
                            <ProfileField>
                                <span>Name</span><strong className='text-capitalize'>{userData.firstName + ' ' + userData.lastName}</strong>
                            </ProfileField>
                            <ProfileField>
                                <span>Username</span><strong>@{userData.username}</strong>
                            </ProfileField>
                            <ProfileField>
                                {role === 'TRAINER' && <span>Teaches</span>}
                                {role === 'CUSTOMER' && <span>Enrolled in</span>}
                                {role === 'ADMIN' && <span>Role</span>}

                                <div>

                                    {role === 'TRAINER' && <Badge bg="primary" className="me-1">{userData.facility.facilityName}</Badge>}
                                    {role === 'CUSTOMER' && <>{userData.facility.map(x => <Badge bg="primary" className="me-1">{x.facilityName}</Badge>)}</>}
                                    {role === 'ADMIN' && <Badge bg="primary" className="me-1">admin</Badge>}
                                </div>
                            </ProfileField>
                            <ProfileField>

                                <span>Address</span><div className="text-end">{getAddress()}</div>
                            </ProfileField>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} xl={6}>
                <Card className="shadow">
                    <Card.Body className="px-5 pt-3 pb-5">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter new password" required value={newPassword1} onChange={e => setNewPassword1(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Re-enter New Password</Form.Label>
                                <Form.Control type="password" placeholder="Re-enter new password" required value={newPassword2} onChange={e => setNewPassword2(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <ToastContainer className="p-3" position="bottom-end">
            <Toast show={showPasswordsDontMatchToast} autohide={5000} onClose={() => setShowPasswordsDontMatchToast(false)} bg={'danger'}>
                <Toast.Header closeButton={true}>
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body className="text-white">
                    Passwords don't match
                </Toast.Body>
            </Toast>
            <Toast show={showOldPasswordToast !== ''} autohide={5000} onClose={() => setShowOldPasswordToast('')} bg={'danger'}>
                <Toast.Header closeButton={true}>
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body className="text-white">
                    {showOldPasswordToast}
                </Toast.Body>
            </Toast>
            <Toast show={showPasswordChangedToast} autohide={5000} onClose={() => setShowPasswordChangedToast(false)} bg={'success'}>
                <Toast.Header closeButton={true}>
                    <strong className="me-auto">Success</strong>
                </Toast.Header>
                <Toast.Body className="text-white">
                    Passwords Changed Successfully
                </Toast.Body>
            </Toast>
        </ToastContainer>
    </>
}

export default ProfileComponent