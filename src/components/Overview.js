import React from 'react'
import moment from 'moment'
import numeral from 'numeral'

import DataContext from '../contexts/DataContext'
import fields from '../utils/fields'
import fields2 from '../utils/fields-alt'

const processData = (allRecords) => {
    let totalCount = 0
    let deathCount = 0
    let recoveredCount = 0
    let newCount = 0
    let countries = {}

    // console.table(allRecords)

    for (const key in allRecords) {
        const record = allRecords[key]
        const country = record[fields.COUNTRY] || record[fields2.COUNTRY]
        if (!countries[country]) countries[country] = 1
        totalCount += parseInt(record[fields.CONFIRMED])
        deathCount += parseInt(record[fields.DEATHS])
        recoveredCount += parseInt(record[fields.RECOVERED])
        newCount += parseInt(record[fields.NEW_CASES])
    }
    const countryCount = Object.keys(countries).length

    return [totalCount, deathCount, recoveredCount, newCount, countryCount]
}

class Overview extends React.Component {
    static contextType = DataContext

    render() {
        const data = this.context.data
        const date = moment(data.date, 'MM-DD-YYYY').format('DD/MM/YYYY')
        const records = data.covidData
        const [
            totalCount,
            deathCount,
            recoveredCount,
            newCount,
            countryCount
        ] = processData(records)

        return (
            <div>
                <h2>Overview</h2>
                <p style={{ fontSize: '110%' }}>
                    Last updated on <strong>{date}</strong>. Data is typically
                    refreshed daily at 0:00 GMT+0.
                </p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="text-primary">TOTAL</th>
                            <th className="text-warning">NEW*</th>
                            <th className="text-danger">DEATHS</th>
                            <th className="text-success">RECOVERED</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-primary">
                                {numeral(totalCount).format('0,0')}
                            </td>
                            <td className="text-warning">
                                {numeral(newCount).format('0,0')}
                            </td>
                            <td className="text-danger">
                                {numeral(deathCount).format('0,0')}
                            </td>
                            <td className="text-success">
                                {numeral(recoveredCount).format('0,0')}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p>* Compared to previous day</p>
                <p style={{ fontSize: '120%' }}>
                    Affected countries:{' '}
                    <strong className="text-info">{countryCount}</strong>
                </p>

                <p>
                    Source:{' '}
                    <a
                        href="https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports"
                        target="blank"
                    >
                        JHU CSSE
                    </a>
                </p>
            </div>
        )
    }
}

export default Overview
