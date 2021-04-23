/**
 *
 * @param latitude
 * @param longitude
 * @param arr
 * @returns
 */
export function sortByGeoLocation(
  latitude: number,
  longitude: number,
  arr: any[]
) {
  arr.forEach(value => {
    const radLat1 = (latitude * Math.PI) / 180.0
    const radLat2 = (value.mapAddr[1] * Math.PI) / 180.0
    const a = radLat1 - radLat2
    const b =
      (longitude * Math.PI) / 180.0 - (value.mapAddr[0] * Math.PI) / 180.0
    let s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
        )
      )
    s = s * 6378.137
    s = Math.round(s * 10000) / 10000
    value.distance = s.toFixed(1)
  })
  arr.sort(function(v1, v2) {
    if (v1.distance >= v2.distance) {
      return 1
    } else {
      return -1
    }
  })
  return arr
}
