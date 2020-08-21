import React from "react";
import styled from "styled-components";

const Image = styled.img `
 width: 80%;
 height: auto;
 margin-top: 40px;
 border-radius: 10px;
`
const HeadHome = styled.h2`
text-align: center;
font-family: "Noto Sans KR";
font-size: 2.0em;

`

const Home = props => {

    return (
        <div>
            <HeadHome>Order Now!</HeadHome>
            <Image src="/pizza-home.jpg" alt="fresh cooked pizza"/>
        </div>
    )
}

export default Home