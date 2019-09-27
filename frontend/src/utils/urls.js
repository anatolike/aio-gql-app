import config from "../config"
import {isServer} from "./helpers";

export function getGraphQLUrl() {
  return isServer() ? `${config.dockerServerUrl}/gql/` : `${config.publicServerUrl}/gql/`;
}
