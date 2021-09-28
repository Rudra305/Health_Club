import { Button } from "react-bootstrap";
import styled from "styled-components";

export const FAB = styled(Button)`
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    border-radius: 10000px;
    & svg {
        font-size: 1.3rem;
    }
`