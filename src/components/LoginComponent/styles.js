import { Card, Container } from "react-bootstrap";
import styled from "styled-components";

export const StyledContainer = styled(Container)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

export const StyledCard = styled(Card)`
    min-width: min(80vw, 400px);
`

export const Background = styled.div`
    background-image: url('/login.jpg');
`