import styled from 'styled-components';

const Button = styled.button`
    width: ${props => (props.width ? props.width : '100%')};
    border: 1px;
    border-radius: 10px;
    padding: .2rem;
    text-transform: uppercase;
    font-weight: bold;
    background-color: ${props => (props.variant === 'variant' ? 'white' : '#4cb8c4')};
    color: ${props => (props.variant ? '#4cb8c4' : 'white')};
    cursor: pointer;
    pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
    opacity: ${props => (props.disabled ? 0.5 : 1)};
    text-decoration: none;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    border: 3px solid #4cb8c4;
`

export default Button;