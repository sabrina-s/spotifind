import { GET_DOGS_API } from '../constants/api';

export default async function fetchDogs() {
  const response = await fetch(GET_DOGS_API);
  const json = await response.json();
  return json;
}
