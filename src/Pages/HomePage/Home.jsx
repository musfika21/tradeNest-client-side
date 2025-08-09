import React from 'react';
import Loader from '../../components/Loader';
import Slider from './Slider';
import Choose from "./Choose";
import Works from "./Works";
import Categories from '../Category/Categories';
import CommonButton from '../../Shared/CommonButton';

const Home = () => {
    return (
        <div>
            <Slider/>
            <Categories/>
            <Choose/>
            <Works/>
            <CommonButton>hello</CommonButton>
        </div>
    );
};

export default Home;