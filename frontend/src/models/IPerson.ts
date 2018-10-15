export interface IPerson {
  id: string,
  name: string,
  location: {
    lat: number,
    lng: number
  },
  direction: number
}