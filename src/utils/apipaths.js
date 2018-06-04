/**
 * Contains API paths, which can be imported as required
 */

/**
 * [GET_LOCATION_BY_IP: Do a GET request to get approximate location information]
 * @type {String}
 */
const GET_LOCATION_BY_IP = 'https://crowdalert.herokuapp.com/api/location/get_location';
/**
 * [GET_EVENT_BY_ID: Do GET request with event id as a url parameter]
 * @type {String}
 */
const GET_EVENT_BY_ID = 'https://crowdalert.herokuapp.com/api/events/geteventbyid';
/**
 * [GET_IMAGE_URLS Do GET request with image uuid to get the iamge urls]
 * @type {String}
 */
const GET_IMAGE_URLS = 'https://crowdalert.herokuapp.com/api/images/getimageurl';

const REVERSE_GEOCODE = 'https://crowdalert.herokuapp.com/api/location/reverse_geocode';

const GET_EVENTS_BY_LOCATION = 'https://crowdalert.herokuapp.com/api/events/geteventsbylocation';

export {
  GET_LOCATION_BY_IP,
  GET_EVENT_BY_ID,
  GET_IMAGE_URLS,
  REVERSE_GEOCODE,
  GET_EVENTS_BY_LOCATION,
};
