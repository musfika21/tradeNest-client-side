import React from 'react';
import Loader from '../../components/Loader';
import Slider from './Slider';
import Choose from "./Choose";
import Works from "./Works";
import Categories from '../Category/Categories';

const Home = () => {
    return (
        <div>
            <Slider/>
            <Categories/>
            <Choose/>
            <Works/>
        </div>
    );
};

export default Home;