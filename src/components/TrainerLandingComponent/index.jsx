import { useEffect, useState } from "react";
import { Alert, Badge, Table } from "react-bootstrap"
import { showAllUserApi } from "../../api/authentication";
import { fetchApiWrapper } from "../../api/FetchApiWrapper";

const TrainerLandingComponent = ({ userData = {} }) => {
    const [userList, setUserList] = useState([])
    const facility = userData.facility;
    const showAllUser = async () => {
        if (facility) {
            const [{ statusCode, data }, error] = await fetchApiWrapper(() => showAllUserApi(facility.facilityName));
            if (statusCode === 200) {
                console.log(data)
                setUserList(data)
            }
        }
    }
    useEffect(() => {
        console.log(userData)
        showAllUser()
    }, [])
    return <div>
        <Alert variant="success">
            You're currently in charge of <strong className="text-uppercase">{facility?.facilityName}</strong> class
        </Alert>
        <h4 className="my-4">List of Participants</h4>
        <Table bordered hover className="shadow">
            <thead>
                <tr>
                    <th>User Name</th>
                    <th>Name</th>
                    <th>Contact Number</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Enrolled in</th>
                    <th>Active</th>
                </tr>
            </thead>
            <tbody>
                {userList.map(x => 
                <tr>
                    <td>{x.username}</td>
                    <td className='text-capitalize'>{x.firstName+' '+x.lastName}</td>
                    <td>{x.mobileNo}</td>
                    <td>{x.gender==='M'?"Male":"Female"}</td>
                    <td>{x.address[0].houseNo+', '+x.address[0].city+' '+x.address[0].state}</td>
                    <td>{x.facility.map(x=><Badge className='me-2'>{x.facilityName}</Badge>)}</td>
                    <td>{x.active?<Badge>Active</Badge>:<Badge>Inactive</Badge>}</td>
                </tr>)}
            </tbody>
        </Table>
    </div>
}

export default TrainerLandingComponent