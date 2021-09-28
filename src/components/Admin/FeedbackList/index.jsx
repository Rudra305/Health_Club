import { useEffect, useState } from "react"
import { Card, Col, Image, Pagination, Row } from "react-bootstrap"
import { showAllFeedbacksApi } from "../../../api/authentication"
import { fetchApiWrapper } from "../../../api/FetchApiWrapper"
import usePagination from "../../../usePagination"

const NUMBER_OF_FEEDBACKS_PER_PAGE = 12

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const showAllFeedback = async () => {
        const [{ statusCode, data },] = await fetchApiWrapper(() => showAllFeedbacksApi(), "Please provide valid name");
        if (statusCode == 200) {
            setFeedbacks(data)
        }
    }
    useEffect(() => {
        showAllFeedback()
    }, [])

    const [paginatedItems, pageCount, currentPage, setCurrentPage] = usePagination(feedbacks, NUMBER_OF_FEEDBACKS_PER_PAGE)
    return <>
        <div className="d-flex justify-content-between">
            <h4>Feedbacks </h4>
            <Pagination>
                {
                    Array(pageCount).fill(0).map((page, i) => {
                        return <Pagination.Item active={i === currentPage} onClick={() => setCurrentPage(i)}>{i + 1}</Pagination.Item>
                    })
                }
            </Pagination>
        </div>
        <Row>
            {
                paginatedItems.map(feedback => {
                    return <Col xs={6} md={4} lg={3} className="mb-4">
                        <Card className="shadow h-100">
                            <Card.Body>
                                <p>{feedback.feedback}</p>
                                <div className="d-flex align-items-center">
                                    <Image src="/user.png" style={{ height: '40px', width: '40px' }} />
                                    <div className="text-end flex-grow-1">
                                        <h6 className="mb-0">@{feedback.username}</h6>
                                        <div className="text-primary">
                                            {
                                                Array(feedback.rating).fill(0).map((page, i) => {
                                                    return <span>&#9733;</span>
                                                })
                                            }
                                            {
                                                Array(5 - feedback.rating).fill(0).map((page, i) => {
                                                    return <span>&#9734;</span>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                })
            }
        </Row>
    </>
}

export default FeedbackList