import React from 'react'

class TravelInfo extends React.Component {
    componentDidMount() {
        // eslint-disable-next-line no-undef
        $sherpa.V2.createElement('map').mount('#sherpa-map')
    }
    render() {
        return <div id="sherpa-map"></div>
    }
}

export default TravelInfo
