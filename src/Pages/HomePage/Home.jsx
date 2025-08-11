import React from 'react';
import Loader from '../../components/Loader';
import Slider from './Slider';
import Choose from "./Choose";
import Works from "./Works";
import Categories from '../Category/Categories';
import CommonButton from '../../Shared/CommonButton';
import Feature from './Feature';
import Reviews from './Reviews';

const Home = () => {
    return (
        <div>
            <Slider/>
            {/* <Feature/> */}
            <Choose/>
            <Reviews/>
            <Works/>
        </div>
    );
};

export default Home;