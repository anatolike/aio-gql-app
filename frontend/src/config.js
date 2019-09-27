import config from "../config.json"

const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];


export default environmentConfig