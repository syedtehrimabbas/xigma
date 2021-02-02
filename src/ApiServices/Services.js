import PreferencesKeys from "../UtilMethods/PreferencesKeys";
import AsyncStorage from '@react-native-community/async-storage';

// export const BASE_API_URL = 'http://www.xigmaportal.co.uk:3000/v1/';
export const BASE_API_URL = 'https://chamakcraft.com/v1/';

let endPoints = {
    signin: 'login',
    todayClinic: 'appointment/today-clinic?expertId=',
    futureClinic: 'appointment/future-clinic?expertId=',
};

class Services {
    token = async () => {
        let token = await AsyncStorage.getItem(PreferencesKeys.TOKEN);
        token = JSON.parse(token);
        return token;
    };

    getAbsoluteUrl = (endPoint) => {
        console.log('End Pint=> ' + endPoint + '\nUrl=> ', BASE_API_URL);
        console.log(BASE_API_URL + endPoint);
        return BASE_API_URL + endPoint;
    };

    requestHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    //-------------SignIn-------------------
    signIn(data, callback) {

        console.log("data", data);

        return fetch(this.getAbsoluteUrl(endPoints.signin), {
            method: "POST",
            headers: this.requestHeaders,
            body: data
        }).then((response) => response.json())
            .then((res) => callback({success: res.success, response: res}))
            .catch((error) => callback({success: false, response: error}));
    }

    //-------------todayClinic-------------------
    todayClinic(id, callback) {
        return fetch(this.getAbsoluteUrl(`${endPoints.todayClinic}${id}`), {
            method: "GET",
            headers: this.requestHeaders
        }).then((response) => response.json())
            .then((res) => callback({success: res.success, response: res}))
            .catch((error) => callback({success: false, response: error}));
    }

    //-------------futureClinic-------------------
    futureClinic(id, callback) {
        return fetch(this.getAbsoluteUrl(`${endPoints.futureClinic}${id}`), {
            method: "GET",
            headers: this.requestHeaders
        }).then((response) => response.json())
            .then((res) => callback({success: res.success, response: res}))
            .catch((error) => callback({success: false, response: error}));
    }
}

const ApiServices = new Services();
export default ApiServices;
