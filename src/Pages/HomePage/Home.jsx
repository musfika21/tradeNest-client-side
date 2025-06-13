import React from 'react';
import Loader from '../../components/Loader';
import Slider from './Slider';
import Choose from "./Choose";
import Works from "./Works";

const Home = () => {
    return (
        <div>
            <Slider/>
            <Choose/>
            <Works/>
        </div>
    );
};

export default Home;