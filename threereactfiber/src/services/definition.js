
import {apiPost, apiGet} from './api.js'


export const fetchGHDefinitionInfo = () => {

  let promise = apiGet('GetGHDefinitions')
  return promise
};
