import { useState } from 'react'
import { Card, Button, Badge } from "react-bootstrap"
import { FaUserCheck, FaUserTie, FaCheckCircle, FaPlus } from 'react-icons/fa'

const ActivityCard = props => {
    const { title, img, subtitle, enrolledCount, instructorCount, disabled, onClick } = props
    const [isHovering, setIsHovering] = useState(false)

    return (
        <Card
            className="overflow-hidden border-0 shadow-sm h-100"
            style={{
                borderRadius: "16px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isHovering ? "translateY(-4px)" : "none",
                boxShadow: isHovering ? "0 12px 28px rgba(0, 0, 0, 0.12)" : "0 4px 12px rgba(0, 0, 0, 0.05)"
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="row g-0 h-100">
                <div className="col-md-5 position-relative overflow-hidden" style={{ minHeight: "180px" }}>
                    <img
                        src={img}
                        alt={title}
                        className="w-100 h-100"
                        style={{
                            objectFit: "cover",
                            transition: "transform 0.5s ease",
                            transform: isHovering ? "scale(1.06)" : "scale(1)",
                            filter: disabled && !isHovering ? "grayscale(40%)" : "none"
                        }}
                    />
                    {!disabled && (
                        <Badge
                            bg="success"
                            className="position-absolute top-0 start-0 m-3 px-3 py-2 shadow-sm d-flex align-items-center"
                        >
                            <FaCheckCircle className="me-1" /> Enrolled
                        </Badge>
                    )}
                </div>
                <div className="col-md-7 d-flex flex-column">
                    <Card.Body className="p-4 d-flex flex-column justify-content-between">
                        <div>
                            <h5 className="fw-bold mb-1 text-dark">{title}</h5>
                            <p className="text-muted small mb-3">{subtitle}</p>

                            <div className="d-flex flex-wrap gap-2 mb-4">
                                <span className="badge bg-light text-secondary border px-2 py-1 small">
                                    <FaUserCheck className="me-1 text-primary" /> <strong>{enrolledCount}</strong> Members
                                </span>
                                <span className="badge bg-light text-secondary border px-2 py-1 small">
                                    <FaUserTie className="me-1 text-info" /> <strong>{instructorCount}</strong> Trainers
                                </span>
                            </div>
                        </div>

                        <div>
                            {disabled ? (
                                <Button
                                    variant="primary"
                                    className="w-100 d-flex align-items-center justify-content-center py-2"
                                    onClick={onClick}
                                >
                                    <FaPlus className="me-2" /> Subscribe Facility
                                </Button>
                            ) : (
                                <Button
                                    variant="outline-danger"
                                    className="w-100 py-2 fw-semibold rounded-3"
                                    onClick={onClick}
                                >
                                    Unsubscribe
                                </Button>
                            )}
                        </div>
                    </Card.Body>
                </div>
            </div>
        </Card>
    )
}

export default ActivityCard