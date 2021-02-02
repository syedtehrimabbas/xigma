import {Image,} from 'react-native';
import React from 'react';
import {images} from "../assets/images";

export function numDifferentiation(value) {
    let val = Math.abs(value);
    if (val >= 10000000) {
        val = (val / 10000000).toFixed(2) + ' Cr';
    } else if (val >= 100000) {
        val = (val / 100000).toFixed(2) + ' Lac';
    }
    return val;
}

export function purposeOfProperty(is_rental) {
    if (is_rental === 1 || is_rental === "1")
        return "Rent";
    else return "Sale"
}

export function getAbsoluteImage(image) {
    return `https://baqalat.cyphersol.com/images/${image}`
}

export function getItemImage(item, styles) {
    let imagePath = '';
    let productImages = item.images;
    if (productImages && productImages.length > 0) {
        imagePath = productImages[0].image
    }
    console.log("imagePath ", imagePath);

    return <Image
        style={styles}
        source={imagePath === '' ? images.tomato : {uri: imagePath}}
    />
}