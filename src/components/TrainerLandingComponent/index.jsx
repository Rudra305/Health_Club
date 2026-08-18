import { useEffect, useState, useCallback } from "react";
import { Alert, Badge, Table } from "react-bootstrap"
import { showAllUserApi } from "../../api/authentication";
import { fetchApiWrapper } from "../../api/FetchApiWrapper";

const TrainerLandingComponent = ({ userData = {} }) => {
    const [userList, setUserList] = useState([])
    const facility = userData.facility;

    const showAllUser = useCallback(async () => {
        if (facility) {
            const [{ statusCode, data }] = await fetchApiWrapper(() => showAllUserApi(facility.facilityName));
            if (statusCode === 200) {
                setUserList(data)
            }
        }
    }, [facility]);

    useEffect(() => {
        showAllUser()
    }, [showAllUser])
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
                {userList.map((x, idx) => {
                    const addr = x.address && Array.isArray(x.address) && x.address.length > 0
                        ? `${x.address[0].houseNo || ''}, ${x.address[0].city || ''} ${x.address[0].state || ''}`.replace(/^,\s*/, '').trim()
                        : (x.city ? `${x.city} ${x.state || ''}`.trim() : 'N/A');
                    const facilities = Array.isArray(x.facility) ? x.facility : [];
                    return (
                        <tr key={x.username || idx}>
                            <td>{x.username}</td>
                            <td className='text-capitalize'>{x.firstName + ' ' + (x.lastName || '')}</td>
                            <td>{x.mobileNo || x.phone || 'N/A'}</td>
                            <td>{x.gender === 'M' ? "Male" : "Female"}</td>
                            <td>{addr}</td>
                            <td>{facilities.map((f, i) => <Badge key={i} bg="primary" className='me-1'>{f.facilityName || f}</Badge>)}</td>
                            <td>{x.active ? <Badge bg="success">Active</Badge> : <Badge bg="secondary">Inactive</Badge>}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    </div>
}

export default TrainerLandingComponent