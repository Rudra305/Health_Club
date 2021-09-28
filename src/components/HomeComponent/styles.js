import { Image } from "react-bootstrap";
import { Container as BootstrapContainer, Nav as BootstrapNav } from "react-bootstrap";
import styled from "styled-components";

export const Container = styled(BootstrapContainer)`
    height: 100vh;
`

export const Nav = styled(BootstrapNav)`
    width: 300px;
    @media (max-width: 1200px) {
        & .nav-text {
            display: none;
        }
        & .nav-item {
            width: 45px;
        }
        & .nav-link {
            padding: 5px 2px 10px 8px;
            font-size: 1.2rem;
            text-align: center;
        }
        & .personal-details {
            display: none;
        }
        & .thumbnail {
            height: 45px;
            width: 45px;
        }
        width: 75px;
        overflow: hidden;
    }
`

export const ProfileImage = styled(Image)`
    height: 75px;
    width: 75px;
`