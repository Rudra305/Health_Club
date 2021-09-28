import React, { useEffect } from "react"
import { Badge, Card, Form, FormControl, InputGroup } from "react-bootstrap"
import { FaSearch } from "react-icons/fa"
import { activateAccountUserApi, deactivateAccountUserApi, deleteUserApi, showAllUserApi } from "../../../api/authentication"
import { fetchApiWrapper } from "../../../api/FetchApiWrapper"
import PaginatedTable from "../../common/PaginatedTable"

// const customers = [
//     [10, 'Rahul Singh', 'rs280599@gmail.com', 'something', 'rs280599@gmail.com', ['Swimming', 'Gym'], 10],
//     [10, 'Rahul Singh', 'rs280599@gmail.com', 'something', 'rs280599@gmail.com', ['Gym', 'Yoga'], 10],
//     [10, 'Rahul Singh', 'rs280599@gmail.com', 'something', 'rs280599@gmail.com', ['Gym', 'Swimming'], 10],
//     [10, 'Rahul Singh', 'rs280599@gmail.com', 'something', 'rs280599@gmail.com', ['Yoga'], 10],
// ]

const FacilityRenderer = ({ val }) => {
    return val.map(facility => {
        return <Badge pill bg="primary" className="me-1 text-capitalize">{facility}</Badge>
    })
}
const UsernameRenderer = ({ val }) => {
    return <span>{val}</span>
}


const CustomerList = () => {
    const [search, setSearch] = React.useState('')
    const [showSwimming, setShowSwimming] = React.useState(true)
    const [showGym, setShowGym] = React.useState(true)
    const [showYoga, setShowYoga] = React.useState(true)
    const [unenrolled, setUnenrolled] = React.useState(true)
    const [customers, setCustomers] = React.useState([])
    useEffect(() => {
        getAllUser()
    }, [])
    const getAllUser = async () => {
        const [{ statusCode, data }, error] = await fetchApiWrapper(() => showAllUserApi(window.localStorage.getItem("token")));
        if (statusCode === 200) {

            setCustomers(data.map(x => {
                return ['@' + x.username, x.firstName + ' ' + x.lastName, x.gender, x.mobileNo, x.address[0].houseNo + ', ' + x.address[0].city + ', ' + x.address[0].state, x.facility.map(y => y.facilityName), { "username": x.username, "active": x.active }]

            }))
        } else {

        }
    }
    const ActionsRenderer = ({ val }) => {
        const enableUser = async () => {
            const [{ statusCode, data },] = await fetchApiWrapper(() => activateAccountUserApi(val.username));
            if (statusCode === 200)
                getAllUser()
        }
        const disableUser = async () => {
            const [{ statusCode, data },] = await fetchApiWrapper(() => deactivateAccountUserApi(val.username));
            if (statusCode === 200)
                getAllUser()
        }
        const deleteUser = async () => {
            const [{ statusCode, data },] = await fetchApiWrapper(() => deleteUserApi(val.username));
            if (statusCode === 200)
                getAllUser()
        }

        return <>
            {val.active && <Badge pill bg="primary" className="me-1" onClick={disableUser}>Diasable</Badge>}
            {!val.active && <Badge pill bg="secondary" className="me-1" onClick={enableUser}>Enable</Badge>}
            <Badge pill bg="danger" onClick={deleteUser}>Delete</Badge>
        </>
    }
    const cols = [{ name: 'Username', renderer: UsernameRenderer }, { name: 'Name' }, { name: 'Gender' }, { name: 'Mobile No.' }, { name: 'Address' }, { name: 'Facility', renderer: FacilityRenderer }, { name: 'Actions', renderer: ActionsRenderer }]

    const getItems = () => customers.filter(customer => {
        return customer[1].toLowerCase().includes(search) || customer[2].toLowerCase().includes(search) || ('' + customer[3]).toLowerCase().includes(search)
    }).filter(customer => {
        return (customer[5].includes("swimming") && showSwimming) || (customer[5].includes("yoga") && showYoga) || (customer[5].includes("gym") && showGym || (customer[5].length == 0 && unenrolled))
    })

    return <>
        <h4 className="mb-4">Customer List</h4>
        <Card className="mb-4 shadow">
            <Card.Body className="d-flex align-items-center">
                <InputGroup style={{ width: 400 }} className="me-3">
                    <InputGroup.Text><FaSearch /></InputGroup.Text>
                    <FormControl placeholder="Start typing to search..." value={search} onChange={e => setSearch(e.target.value)} />
                </InputGroup>
                <div className="flex-grow-1" />
                <div className="d-flex align-items-center">
                    <Form.Check checked={unenrolled} onChange={e => setUnenrolled(e.target.checked)} className="me-3" type="checkbox" label="Unenrolled" />
                    <Form.Check checked={showSwimming} onChange={e => setShowSwimming(e.target.checked)} className="me-3" type="checkbox" label="Swimming" />
                    <Form.Check checked={showGym} onChange={e => setShowGym(e.target.checked)} className="me-3" type="checkbox" label="Gym" />
                    <Form.Check checked={showYoga} onChange={e => setShowYoga(e.target.checked)} className="me-3" type="checkbox" label="Yoga" />
                </div>
            </Card.Body>
        </Card>
        <PaginatedTable cols={cols} items={getItems()} />
    </>
}

export default CustomerList