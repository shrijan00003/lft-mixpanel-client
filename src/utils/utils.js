let width = 0;
const utils = {
  // CONVERTING SCREEN_SIZE TO DEVICE TYPE
  deviceDetector(deviceData) {
    width = parseInt(deviceData.device.split('x')[0], 10);
    if (width <= 480) {
      deviceData.device = 'Mobile/Smartphone';
    } else if (width > 480 && width <= 768) {
      deviceData.device = 'Tablet/iPads';
    } else {
      deviceData.device = 'PC';
    }

    return deviceData;
  },
};

export default utils;
