import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

const XigmaAlert = ({alertShow, alertMessage, onHideAlert}) => {
    return (<AwesomeAlert
        show={alertShow}
        showProgress={false}
        title="Xigma"
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Okay"
        confirmButtonColor="#1B93E9"
        onConfirmPressed={() => {
            onHideAlert();
        }}
        onDismiss={() => {
            onHideAlert();
        }}
    />)
};
export default XigmaAlert;