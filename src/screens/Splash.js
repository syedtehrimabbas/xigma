import React from 'react';
import {Image, ImageBackground} from 'react-native';
import {images} from "../assets/images";

const Splash = () => {
    return (
        <ImageBackground source={images.app_bg}
                         style={{
                             flex: 1,
                             justifyContent: 'center',
                             alignItems: 'center',
                         }}>
            <Image style={{alignSelf: 'center', width: 150, height: 150}}
                   resizeMode="contain"
                   source={images.appIcon}/>

        </ImageBackground>
    );
};
export default Splash;