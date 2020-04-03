import fields from '../utils/fields'
import fields2 from '../utils/fields-alt'

const convertToGeoJSON = (data) => {
    const geojson = {}
    geojson.type = 'FeatureCollection'
    geojson.features = []

    for (const location in data) {
        const state =
            data[location][fields.STATE] || data[location][fields2.STATE]
        const country =
            data[location][fields.COUNTRY] || data[location][fields2.COUNTRY]
        const totalCases = parseInt(data[location][fields.CONFIRMED])
        const newCases = parseInt(data[location][fields.NEW_CASES])
        const deaths = parseInt(data[location][fields.DEATHS])
        const recovered = parseInt(data[location][fields.RECOVERED])

        const latRaw =
            data[location][fields.LATITUDE] || data[location][fields2.LATITUDE]
        const lngRaw =
            data[location][fields.LONGITUDE] ||
            data[location][fields2.LONGITUDE]

        const lat = parseFloat(latRaw)
        const lng = parseFloat(lngRaw)

        if (isNaN(lat) || isNaN(lng)) continue

        const title = state !== '' ? state + ' - ' + country : country
        const record = {}
        record.type = 'Feature'
        record.geometry = {
            type: 'Point',
            coordinates: [lng, lat]
        }
        record.properties = {
            title,
            totalCases,
            newCases,
            deaths,
            recovered,
            description: `
                        <strong>${title}</strong><br/>
                        Confirmed: ${totalCases}<br/>
                        New Cases: ${newCases}<br/>
                        Deaths: ${deaths}<br/>
                        Recovered: ${recovered}
                        `
        }
        geojson.features.push(record)
    }

    return geojson
}

export const addMarkers = (data, map, mapboxgl) => {
    const geojson = convertToGeoJSON(data)

    geojson.features.forEach(function(marker) {
        // create a HTML element for each feature
        const el = document.createElement('div')
        el.className = 'marker'

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(marker.properties.description)
            )
            .addTo(map)
    })
}

const flyToLocation = (data, map, location) => {
    const latRaw =
        data[location][fields.LATITUDE] || data[location][fields2.LATITUDE]
    const lngRaw =
        data[location][fields.LONGITUDE] || data[location][fields2.LONGITUDE]
    const lat = parseFloat(latRaw)
    const lng = parseFloat(lngRaw)
    map.flyTo({ center: [lng, lat], zoom: 6 })
}

export default { flyToLocation, addMarkers }
