import { Container as BContainer, Button, Badge } from "react-bootstrap"
import { NavLink, Route, Switch } from "react-router-dom"
import { FaHome, FaKey, FaUsers } from 'react-icons/fa'
import { GiTeacher } from 'react-icons/gi'
import { FiLogOut } from 'react-icons/fi'
import { Container, Nav, ProfileImage } from "./styles"
import UserLandingComponent from "../UserLandingComponent"
import TrainerLandingComponent from "../TrainerLandingComponent"
import ProfileComponent from "../ProfileComponent"
import TrainerList from "../Admin/TrainerList"
import CustomerList from "../Admin/CustomerList"
import { useHistory } from "react-router"
import { useState } from "react"
import { fetchUserApi } from "../../api/authentication"
import { fetchApiWrapper } from "../../api/FetchApiWrapper"
import FeedbackList from "../Admin/FeedbackList"
import Feedback from "../Feedback"

const HomeComponent = () => {
    const [userdata, setUserData] = useState({ facility: [] })
    const [role,] = useState(window.localStorage.getItem("role"))


    const LandingComponent = () => {
        if (role === 'CUSTOMER')
            return <UserLandingComponent data={userdata} resfreshData={fecthUserDetails} />
        else if (role === 'TRAINER')
            return <TrainerLandingComponent userData={userdata} />
        else
            return <FeedbackList />
    }
    const history = useHistory()

    //if token is not there revert to login page
    useState(() => {
        if (window.localStorage.getItem("token") === null || window.localStorage.getItem("role") === null) {
            history.push('/login')
        }
    }, [])



    const fecthUserDetails = async () => {
        const [{ statusCode, data },] = await fetchApiWrapper(() => fetchUserApi(window.localStorage.getItem("username")), "Please provide valid name");
        if (statusCode == 200) {
            setUserData(data)
        } else {
            window.localStorage.clear();
            history.push('/login')
        }

    }

    //get userDetails
    useState(() => {
        fecthUserDetails()
    }, [])


    const logoutUser = () => {
        window.localStorage.clear();
        history.push('/login')
    }
    return <Container fluid className="d-flex">
        <div className="py-3 px-2 h-100">
            <Nav variant="pills" className="py-3 d-flex flex-column shadow-lg h-100 rounded px-3">
                <div className="d-flex align-items-center mb-3">
                    <ProfileImage src="/user.png" thumbnail className="thumbnail" />
                    <div className="ms-2 pt-2 personal-details">
                        <h5 className="mb-0 fw-bold text-capitalize">{userdata.firstName + ' ' + userdata.lastName}</h5>
                        <small className={"fw-bold text-muted"}>@{userdata.username}</small>
                        <p>{window.localStorage.getItem("role") !== 'TRAINER' ? userdata.facility.map(x => <Badge pill bg="primary" className='text-capitalize'>{x.facilityName}</Badge>) : <Badge pill bg="secondary" className='text-capitalize'>{userdata.facility.facilityName}</Badge>}</p>
                    </div>
                </div>
                <hr className="dropdown-divider w-100 mb-3" />


                <Nav.Item className="mb-2">
                    <Nav.Link as={NavLink} exact to="/" activeClassName="active">
                        <FaHome className="me-2" /> <span className="nav-text">Home</span>
                    </Nav.Link>
                </Nav.Item>

                {role === 'ADMIN' && <Nav.Item className="mb-2">
                    <Nav.Link as={NavLink} exact to="/trainers" activeClassName="active">
                        <GiTeacher className="me-2" /> <span className="nav-text">Trainers</span>
                    </Nav.Link>
                </Nav.Item>}

                {role === 'ADMIN' && <Nav.Item className="mb-2">
                    <Nav.Link as={NavLink} exact to="/customers" activeClassName="active">
                        <FaUsers className="me-2" /> <span className="nav-text">Customers</span>
                    </Nav.Link>
                </Nav.Item>}

                <Nav.Item className="mb-2">
                    <Nav.Link as={NavLink} to="/change-password" activeClassName="active">
                        <FaKey className="me-2" /> <span className="nav-text">Change Password</span>
                    </Nav.Link>
                </Nav.Item>

                <div className="flex-grow-1" />
                <Nav.Item className="bg-secondary text-white">
                    <Button className="w-100 text-start rounded" variant="secondary" onClick={logoutUser}>
                        <FiLogOut className="me-2" /> <span className="nav-text">Logout</span>
                    </Button>
                </Nav.Item>
            </Nav>
        </div>
        <BContainer className="py-3">
            <Switch>
                <Route path="/change-password" component={() => <ProfileComponent userData={userdata} />} />
                <Route exact path="/trainers" component={TrainerList} />
                <Route exact path="/customers" component={CustomerList} />
                <Route exact path="/" component={LandingComponent} />
            </Switch>

            {role === 'CUSTOMER' && <Feedback />}
        </BContainer>
    </Container>
}

export default HomeComponent