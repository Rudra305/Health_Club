import { Container as BContainer, Button, Badge } from "react-bootstrap"
import { NavLink, Route, Switch } from "react-router-dom"
import { FaHome, FaKey, FaUsers, FaDumbbell, FaBars, FaTimes } from 'react-icons/fa'
import { GiTeacher } from 'react-icons/gi'
import { FiLogOut } from 'react-icons/fi'
import UserLandingComponent from "../UserLandingComponent"
import TrainerLandingComponent from "../TrainerLandingComponent"
import ProfileComponent from "../ProfileComponent"
import TrainerList from "../Admin/TrainerList"
import CustomerList from "../Admin/CustomerList"
import { useHistory } from "react-router"
import { useState, useEffect, useCallback } from "react"
import { fetchUserApi } from "../../api/authentication"
import { fetchApiWrapper } from "../../api/FetchApiWrapper"
import FeedbackList from "../Admin/FeedbackList"
import Feedback from "../Feedback"

const HomeComponent = () => {
    const [userdata, setUserData] = useState({ facility: [] })
    const [role,] = useState(window.localStorage.getItem("role") || "")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const history = useHistory()

    const LandingComponent = () => {
        if (role === 'CUSTOMER')
            return <UserLandingComponent data={userdata} resfreshData={fecthUserDetails} />
        else if (role === 'TRAINER')
            return <TrainerLandingComponent userData={userdata} />
        else
            return <FeedbackList />
    }

    useEffect(() => {
        if (window.localStorage.getItem("token") === null || window.localStorage.getItem("role") === null) {
            history.push('/login')
        }
    }, [history])

    const fecthUserDetails = useCallback(async () => {
        const username = window.localStorage.getItem("username")
        if (!username) return
        const [{ statusCode, data }] = await fetchApiWrapper(() => fetchUserApi(username), "Please provide valid name");
        if (statusCode === 200) {
            setUserData(data)
        } else {
            window.localStorage.clear();
            history.push('/login')
        }
    }, [history]);

    useEffect(() => {
        fecthUserDetails()
    }, [fecthUserDetails])

    const logoutUser = () => {
        window.localStorage.clear();
        history.push('/login')
    }

    const getInitials = () => {
        const first = userdata.firstName ? userdata.firstName[0] : (userdata.username ? userdata.username[0] : 'U')
        const last = userdata.lastName ? userdata.lastName[0] : ''
        return (first + last).toUpperCase()
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false)
    }

    return (
        <div className="d-flex flex-column flex-lg-row" style={{ minHeight: "100vh", background: "#f8fafc" }}>
            {/* Top Navbar for Mobile & Tablet */}
            <div className="d-lg-none d-flex align-items-center justify-content-between p-3 bg-dark text-white shadow-sm sticky-top">
                <div className="d-flex align-items-center">
                    <div
                        className="d-flex align-items-center justify-content-center me-2 rounded-3"
                        style={{
                            width: "36px",
                            height: "36px",
                            background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                            color: "#fff",
                            fontSize: "18px"
                        }}
                    >
                        <FaDumbbell />
                    </div>
                    <span className="fw-bold tracking-tight">Health Club</span>
                </div>
                <Button
                    variant="outline-light"
                    size="sm"
                    className="border-0 px-2 py-1"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation"
                >
                    {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </Button>
            </div>

            {/* Mobile Backdrop */}
            {mobileMenuOpen && (
                <div
                    className="d-lg-none position-fixed top-0 start-0 w-100 h-100"
                    style={{ background: "rgba(0,0,0,0.5)", zIndex: 1040 }}
                    onClick={closeMobileMenu}
                />
            )}

            {/* Sidebar Navigation */}
            <div
                className={`d-flex flex-column p-3 shadow-sm ${mobileMenuOpen ? 'position-fixed top-0 start-0 h-100' : 'd-none d-lg-flex'}`}
                style={{
                    width: "280px",
                    background: "#0f172a",
                    color: "#f8fafc",
                    borderRight: "1px solid #1e293b",
                    flexShrink: 0,
                    zIndex: 1050,
                    transition: "transform 0.3s ease-in-out"
                }}
            >
                {/* Brand Header */}
                <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-secondary border-opacity-25 px-2">
                    <div className="d-flex align-items-center">
                        <div
                            className="d-flex align-items-center justify-content-center me-3 rounded-3 shadow-sm"
                            style={{
                                width: "42px",
                                height: "42px",
                                background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                                color: "#fff",
                                fontSize: "20px"
                            }}
                        >
                            <FaDumbbell />
                        </div>
                        <div>
                            <h6 className="mb-0 fw-bold text-white tracking-wide">Health Club</h6>
                            <small className="text-secondary" style={{ fontSize: "0.75rem" }}>Management Portal</small>
                        </div>
                    </div>
                    <Button
                        variant="link"
                        className="d-lg-none text-white p-0"
                        onClick={closeMobileMenu}
                    >
                        <FaTimes size={18} />
                    </Button>
                </div>

                {/* User Profile Card */}
                <div className="p-3 mb-4 rounded-3 d-flex align-items-center" style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                    <div
                        className="d-flex align-items-center justify-content-center rounded-circle fw-bold me-3 text-white flex-shrink-0"
                        style={{
                            width: "44px",
                            height: "44px",
                            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            fontSize: "15px"
                        }}
                    >
                        {getInitials()}
                    </div>
                    <div style={{ overflow: "hidden" }}>
                        <div className="fw-bold text-white text-truncate" style={{ fontSize: "0.92rem" }}>
                            {userdata.firstName ? `${userdata.firstName} ${userdata.lastName || ''}` : userdata.username}
                        </div>
                        <Badge bg="primary" className="text-capitalize mt-1" style={{ fontSize: "0.7rem" }}>
                            {role}
                        </Badge>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="nav nav-pills flex-column mb-auto">
                    <div className="mb-2">
                        <NavLink exact to="/" className="nav-link d-flex align-items-center text-decoration-none" activeClassName="active" onClick={closeMobileMenu}>
                            <FaHome className="me-3" style={{ fontSize: "1.1rem" }} />
                            <span>Dashboard</span>
                        </NavLink>
                    </div>

                    {role === 'ADMIN' && (
                        <>
                            <div className="mb-2">
                                <NavLink exact to="/trainers" className="nav-link d-flex align-items-center text-decoration-none" activeClassName="active" onClick={closeMobileMenu}>
                                    <GiTeacher className="me-3" style={{ fontSize: "1.1rem" }} />
                                    <span>Trainers</span>
                                </NavLink>
                            </div>

                            <div className="mb-2">
                                <NavLink exact to="/customers" className="nav-link d-flex align-items-center text-decoration-none" activeClassName="active" onClick={closeMobileMenu}>
                                    <FaUsers className="me-3" style={{ fontSize: "1.1rem" }} />
                                    <span>Customers</span>
                                </NavLink>
                            </div>
                        </>
                    )}

                    <div className="mb-2">
                        <NavLink to="/change-password" className="nav-link d-flex align-items-center text-decoration-none" activeClassName="active" onClick={closeMobileMenu}>
                            <FaKey className="me-3" style={{ fontSize: "1.1rem" }} />
                            <span>Security & Password</span>
                        </NavLink>
                    </div>
                </div>

                {/* Logout Button */}
                <div className="pt-3 border-top border-secondary border-opacity-25 mt-auto">
                    <Button
                        variant="outline-danger"
                        className="w-100 d-flex align-items-center justify-content-center py-2 fw-semibold rounded-3"
                        onClick={logoutUser}
                    >
                        <FiLogOut className="me-2" />
                        <span>Sign Out</span>
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow-1 p-3 p-md-4" style={{ overflowY: "auto", minWidth: 0 }}>
                <BContainer fluid className="px-0 px-md-3">
                    <Switch>
                        <Route path="/change-password" component={() => <ProfileComponent userData={userdata} />} />
                        <Route exact path="/trainers" component={TrainerList} />
                        <Route exact path="/customers" component={CustomerList} />
                        <Route exact path="/" component={LandingComponent} />
                    </Switch>

                    {role === 'CUSTOMER' && <Feedback />}
                </BContainer>
            </div>
        </div>
    )
}

export default HomeComponent