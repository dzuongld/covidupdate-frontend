import React from 'react'
import mapboxgl from 'mapbox-gl'
import List from './List'

import DataContext from '../contexts/DataContext'
import fields from '../utils/fields'
import fields2 from '../utils/fields-alt'
import mapbox from '../visualization/mapbox'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API

class Map extends React.Component {
    static contextType = DataContext

    state = { country: 'Australia', data: {} }
    map = null

    componentDidMount() {
        if (Object.entries(this.state.data).length === 0) {
            this.setState({
                data: this.context.data.covidData
            })
            this.map = new mapboxgl.Map({
                container: this.mapContainer,
                style: 'mapbox://styles/dzuongld/ck7stm0id1l9t1inuoudjp6oy'
            })
            mapbox.addMarkers(this.context.data.covidData, this.map, mapboxgl)
        }
    }

    /* 
        example element: ['ChinaHubei','China - Hubei']
     */
    extractNames(data) {
        const list = []
        for (const location in data) {
            const country =
                data[location][fields.COUNTRY] ||
                data[location][fields2.COUNTRY]
            const state =
                data[location][fields.STATE] ||
                data[location][fields2.STATE] ||
                ''
            const displayedName =
                state !== '' ? country + ' - ' + state : country
            list.push([location, displayedName])
        }
        list.sort((a, b) => {
            if (a[0] > b[0]) return 1
            else if (a[0] < b[0]) return -1
            return 0
        })
        return list
    }

    onCountryChange = (event) => {
        const location = event.target.value
        const country =
            this.state.data[location][fields.COUNTRY] ||
            this.state.data[location][fields2.COUNTRY]

        // trigger 'fly' event on map
        mapbox.flyToLocation(this.state.data, this.map, location)
        // refresh list
        this.setState({ country: country })
    }

    render() {
        const list = this.extractNames(this.state.data)
        return (
            <div>
                <div className="row">
                    <div className="input-group my-3  col-12 col-md-7">
                        <div className="input-group-prepend">
                            <label
                                className="input-group-text"
                                htmlFor="inputGroupSelect01"
                            >
                                Location
                            </label>
                        </div>
                        <select
                            className="custom-select"
                            id="inputGroupSelect01"
                            onChange={this.onCountryChange}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                --Select One--
                            </option>
                            {list.map((record) => {
                                return (
                                    <option key={record[0]} value={record[0]}>
                                        {record[1]}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>

                <div
                    ref={(el) => (this.mapContainer = el)}
                    className="mapContainer"
                ></div>
                <List groupByCountry={false} country={this.state.country} />
            </div>
        )
    }
}

export default Map
