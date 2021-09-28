import React from 'react'
import { Card, Button } from "react-bootstrap"
import { CardImage } from "./styles"

const ActivityCard = props => {
    const {title, img, subtitle, enrolledCount, instructorCount, disabled, onClick} = props

    const [isHovering, setIsHovering] = React.useState(false)
    return <Card className="d-flex flex-row shadow" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <CardImage fluid variant="left" src={img} style={disabled&&!isHovering?({filter: `grayscale(100%) blur(1.5px)`}):({filter: `grayscale(0%) blur(0px)`})}/>
        <Card.Body>
            <h5>{title}</h5>
            <p>{subtitle}</p>
            <small className="d-block text-muted">No of people enrolled: <b>{enrolledCount}</b></small>
            <small className="d-block text-muted mb-2">No of instructors: <b>{instructorCount}</b></small>
            {disabled && <Button onClick={onClick}>Subscribe</Button>}
            {!disabled && <Button variant="secondary" onClick={onClick}>Unsubscribe</Button>}
        </Card.Body>
    </Card>
}

export default ActivityCard