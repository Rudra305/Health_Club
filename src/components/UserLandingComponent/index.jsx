import { Col } from "react-bootstrap"
import { Row } from "react-bootstrap"
import { subscribeMembershipApi, unsubscribeMembershipApi } from "../../api/authentication"
import { fetchApiWrapper } from "../../api/FetchApiWrapper"
import ActivityCard from "../common/ActivityCard"

const UserLandingComponent = ({ data, resfreshData }) => {
    const facilitiesOpted = (data.facility ? data.facility : []).map(x => x.facilityName)

    const onSubmitSubscribe =  (facility) => {
        return  fetchApiWrapper(() => subscribeMembershipApi(window.localStorage.getItem("username"), facility));
    }

    const onSubmitUnsubscribe =  (facility) => {
        return  fetchApiWrapper(() => unsubscribeMembershipApi(window.localStorage.getItem("username"), facility));
    }

    const activateDeactivate = async (facility) => {
        const [{ statusCode, data }, error] = await (facilitiesOpted.includes(facility) ? onSubmitUnsubscribe(facility) : onSubmitSubscribe(facility))

        if (statusCode === 200) {
            resfreshData()
        }
    }

    return <>
        <h4>Our Services</h4>
        <p className="mb-4">Enroll to our state-of-the-art facilities with a single click</p>
        <Row>

            <Col xl={6} className="mb-4">
                <ActivityCard onClick={() => activateDeactivate("gym")} disabled={!facilitiesOpted.includes("gym")} img="/gym.jpg" title="Gym" subtitle="Engage in workouts catered specifically to your need. bla bla bla blab." enrolledCount={32} instructorCount={32} />
            </Col>
            <Col xl={6} className="mb-4">
                <ActivityCard onClick={() => activateDeactivate("yoga")} disabled={!facilitiesOpted.includes("yoga")} img="/yoga.jpg" title="Yoga" subtitle="Engage in workouts catered specifically to your need. bla bla bla blab." enrolledCount={32} instructorCount={32} />
            </Col>
            <Col xl={6} className="mb-4">
                <ActivityCard onClick={() => activateDeactivate("swimming")} disabled={!facilitiesOpted.includes("swimming")} img="/swim.jpg" title="Swimming" subtitle="Engage in workouts catered specifically to your need. bla bla bla blab." enrolledCount={32} instructorCount={32} />
            </Col>
        </Row>
    </>
}

export default UserLandingComponent