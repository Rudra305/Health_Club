import React, { useEffect, useState } from "react"
import { Badge, Card, Form, FormControl, InputGroup } from "react-bootstrap"
import { FaSearch } from "react-icons/fa"
import { activateAccountTrainerApi, deactivateAccountTrainerApi, deleteTrainerApi, showAllTrainerApi } from "../../../api/authentication"
import { fetchApiWrapper } from "../../../api/FetchApiWrapper"
import PaginatedTable from "../../common/PaginatedTable"

// const trainers = [
//     [10, 'Rahul Singh', 'rs280599@gmail.com', 'something', 'rs280599@gmail.com', 'Swimming', 10],
//     [10, 'Rahul Singh', 'rs280599@gmail.com', 'something', 'rs280599@gmail.com', 'Gym', 10],
//     [10, 'Rahul Singh', 'rs280599@gmail.com', 'something', 'rs280599@gmail.com', 'Gym', 10],
//     [10, 'Rahul Singh', 'rs280599@gmail.com', 'something', 'rs280599@gmail.com', 'Yoga', 10],
// ]


const FacilityRenderer = ({ val }) => {
    return <Badge pill bg="primary" className="text-capitalize">{val}</Badge>
}
const UsernameRenderer = ({ val }) => {
    return <span>{val}</span>
}

const TrainerList = () => {
    const [search, setSearch] = React.useState('')
    const [showSwimming, setShowSwimming] = React.useState(true)
    const [showGym, setShowGym] = React.useState(true)
    const [showYoga, setShowYoga] = React.useState(true)
    const [trainers, setTrainers] = useState([]);
    const getItems = () => trainers.filter(trainer => {

        return trainer[1].toLowerCase().includes(search ? search : "") || trainer[2].toLowerCase().includes(search ? search : "") || (trainer[3] + '').toLowerCase().includes(search ? search : "")
    }).filter(trainer => {
        return (trainer[5] === "swimming" && showSwimming) || (trainer[5] === "yoga" && showYoga) || (trainer[5] === "gym" && showGym)
    })
    useEffect(() => {
        getAllTrainer()
    }, [])
    const getAllTrainer = async () => {
        const [{ statusCode, data }, error] = await fetchApiWrapper(() => showAllTrainerApi(window.localStorage.getItem("token")));
        if (statusCode === 200) {
            setTrainers(data.map(x => {
                return ['@' + x.username, x.firstName + ' ' + x.lastName, x.gender, x.mobileNo, x.address[0].houseNo + ', ' + x.address[0].city + ', ' + x.address[0].state, x.facility.facilityName, { "username": x.username, "active": x.active }]

            }))
        } else {

        }
    }
    const ActionsRenderer = ({ val }) => {
        const enableUser = async () => {
            const [{ statusCode, data },] = await fetchApiWrapper(() => activateAccountTrainerApi(val.username));
            if (statusCode === 200)
                getAllTrainer()
        }
        const disableUser = async () => {
            const [{ statusCode, data },] = await fetchApiWrapper(() => deactivateAccountTrainerApi(val.username));
            if (statusCode === 200)
                getAllTrainer()
        }
        const deleteUser = async () => {
            const [{ statusCode, data },] = await fetchApiWrapper(() => deleteTrainerApi(val.username));
            if (statusCode === 200)
                getAllTrainer()
        }

        return <>
            {val.active && <Badge pill bg="primary" className="me-1" onClick={disableUser}>Diasable</Badge>}
            {!val.active && <Badge pill bg="secondary" className="me-1" onClick={enableUser}>Enable</Badge>}
            <Badge pill bg="danger" onClick={deleteUser}>Delete</Badge>
        </>
    }

    const cols = [{ name: 'Username', renderer: UsernameRenderer }, { name: 'Name' }, { name: 'Gender' }, { name: 'Mobile No.' }, { name: 'Address' }, { name: 'Facility', renderer: FacilityRenderer }, { name: 'Actions', renderer: ActionsRenderer }]

    return <>
        <h4 className="mb-4">Trainer List</h4>
        <Card className="mb-4 shadow">
            <Card.Body className="d-flex align-items-center">
                <InputGroup style={{ width: 400 }} className="me-3">
                    <InputGroup.Text><FaSearch /></InputGroup.Text>
                    <FormControl placeholder="Start typing to search..." value={search} onChange={e => setSearch(e.target.value)} />
                </InputGroup>
                <div className="flex-grow-1" />
                <div className="d-flex align-items-center">
                    <Form.Check checked={showSwimming} onChange={e => setShowSwimming(e.target.checked)} className="me-3" type="checkbox" label="Swimming" />
                    <Form.Check checked={showGym} onChange={e => setShowGym(e.target.checked)} className="me-3" type="checkbox" label="Gym" />
                    <Form.Check checked={showYoga} onChange={e => setShowYoga(e.target.checked)} className="me-3" type="checkbox" label="Yoga" />
                </div>
            </Card.Body>
        </Card>
        <PaginatedTable items={getItems()} cols={cols} />
    </>
}

export default TrainerList