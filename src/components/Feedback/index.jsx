import React from 'react'
import { Form, Toast, ToastContainer, Button } from 'react-bootstrap'
import { FAB } from './styles'
import { MdFeedback } from 'react-icons/md'
import { fetchUserApi, sendFeedbackApi } from '../../api/authentication'
import { fetchApiWrapper } from '../../api/FetchApiWrapper'

const Feedback = () => {

    const [show, setShow] = React.useState(false)

    const [rating, setRating] = React.useState(1)
    const [feedback, setFeedback] = React.useState("")
    const sendFeedback = async () => {
        const [{ statusCode, data },] = await fetchApiWrapper(() => sendFeedbackApi(feedback, rating), "Please provide valid name");
        if (statusCode == 200) {
            setRating(1)
            setFeedback("")
            setShow(false)
        }
    }
    return <>
        {!show && <FAB className="shadow" onClick={() => setShow(true)}><MdFeedback className="me-1" /> Leave feedback</FAB>}
        <ToastContainer position="bottom-end" className="p-4">
            <Toast show={show} onClose={() => setShow(false)} className="shadow">
                <Toast.Header>
                    <span className="me-auto">Feedback</span></Toast.Header>
                <Toast.Body>
                    <Form.Label>Please rate our services!</Form.Label>
                    <Form.Range min={1} max={5} step={1} value={rating} onChange={e => setRating(e.target.value)} />
                    <div className="text-end mb-3">
                        <span className="text-primary">&#9733;<strong>{rating}</strong></span>/5
                    </div>
                    <Form.Control as="textarea" value={feedback} onChange={e=>setFeedback(e.target.value)} placeholder="Enter feedback" className="mb-3" />
                    <Button variant="primary" size="sm" disabled={feedback===''} onClick={sendFeedback}>Submit</Button>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    </>
}

export default Feedback