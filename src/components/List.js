import React from 'react'
import numeral from 'numeral'
import fields from '../utils/fields'
import fields2 from '../utils/fields-alt'
import DataContext from '../contexts/DataContext'

const PAGE_SIZE = 10

const transformData = (data, groupByCountry, selectedCountry) => {
    // console.log(data)
    const list = []
    const dataDup = {}

    if (groupByCountry) {
        for (const key in data.covidData) {
            const country = data.covidData[key]
            const countryName =
                country[fields.COUNTRY] || country[fields2.COUNTRY]
            if (dataDup[countryName]) {
                dataDup[countryName][fields.CONFIRMED] += parseInt(
                    country[fields.CONFIRMED]
                )
                dataDup[countryName][fields.DEATHS] += parseInt(
                    country[fields.DEATHS]
                )
                dataDup[countryName][fields.RECOVERED] += parseInt(
                    country[fields.RECOVERED]
                )
                dataDup[countryName][fields.NEW_CASES] += parseInt(
                    country[fields.NEW_CASES]
                )
                dataDup[countryName][fields.ACTIVE] += parseInt(
                    country[fields.ACTIVE]
                )
            } else {
                dataDup[countryName] = {}
                dataDup[countryName][fields.CONFIRMED] = parseInt(
                    country[fields.CONFIRMED]
                )
                dataDup[countryName][fields.DEATHS] = parseInt(
                    country[fields.DEATHS]
                )
                dataDup[countryName][fields.RECOVERED] = parseInt(
                    country[fields.RECOVERED]
                )
                dataDup[countryName][fields.NEW_CASES] = parseInt(
                    country[fields.NEW_CASES]
                )
                dataDup[countryName][fields.ACTIVE] = parseInt(
                    country[fields.ACTIVE]
                )
            }
        }

        for (const country in dataDup) {
            const { Confirmed, Deaths, Recovered, NewCases, Active } = dataDup[
                country
            ]
            list.push([country, Confirmed, NewCases, Deaths, Recovered, Active])
        }
    } else {
        for (const key in data.covidData) {
            const country = data.covidData[key]
            const countryName =
                country[fields.COUNTRY] || country[fields2.COUNTRY]
            if (countryName === selectedCountry) {
                const state = country[fields.STATE] || country[fields2.STATE]
                const confirmed = country[fields.CONFIRMED]
                const deaths = country[fields.DEATHS]
                const recovered = country[fields.RECOVERED]
                const newCases = country[fields.NEW_CASES]
                const active = country[fields.ACTIVE]
                list.push([
                    state,
                    confirmed,
                    newCases,
                    deaths,
                    recovered,
                    active,
                ])
            }
        }
    }

    return list
}

const getDataByPage = (data, page) => {
    const end = page * PAGE_SIZE
    const start = end - PAGE_SIZE
    return data.slice(start, end)
}

class List extends React.Component {
    static contextType = DataContext

    constructor(props, context) {
        super(props, context)
        this.state = {
            data: [],
            dataDisplayed: [],
            currentPage: 1,
            totalPages: 1,
            currentCountry: this.props.country,
        }
    }

    updateData() {
        const newData = transformData(
            this.context.data,
            this.props.groupByCountry,
            this.props.country
        )
        newData.sort((a, b) => {
            return b[1] - a[1]
        })

        const newTotalPages = Math.ceil(newData.length / PAGE_SIZE)

        this.setState({
            data: newData,
            totalPages: newTotalPages,
            dataDisplayed: getDataByPage(newData, this.state.currentPage),
            currentCountry: this.props.country,
        })
    }

    componentDidMount() {
        if (this.state.data.length === 0) this.updateData()
    }

    // refresh list only when country is changed
    componentDidUpdate() {
        if (this.props.country !== this.state.currentCountry) this.updateData()
    }

    // sort by descending order
    sortData = (event) => {
        const index = parseInt(event.target.value)
        const newData = this.state.data.slice()
        newData.sort((a, b) => {
            return b[index] - a[index]
        })
        this.setState({
            data: newData,
            currentPage: 1,
            dataDisplayed: getDataByPage(newData, 1),
        })
    }

    toPage(goBack) {
        const page = goBack
            ? this.state.currentPage - 1
            : this.state.currentPage + 1
        const newData = getDataByPage(this.state.data, page)
        this.setState({
            dataDisplayed: newData,
            currentPage: page,
        })
    }

    render() {
        return (
            <div>
                <h2>{this.state.currentCountry}</h2>

                <h4>
                    {this.props.groupByCountry
                        ? 'Countries/Regions'
                        : 'States/Provinces'}
                </h4>

                <div className="row">
                    <div className="input-group mb-3 col-8 col-md-4 col-lg-3">
                        <div className="input-group-prepend">
                            <label
                                className="input-group-text"
                                htmlFor="inputGroupSelect01"
                            >
                                Sort By
                            </label>
                        </div>
                        <select
                            className="custom-select"
                            id="inputGroupSelect01"
                            onChange={this.sortData}
                            defaultValue="1"
                        >
                            <option value="" disabled>
                                --Select One--
                            </option>
                            <option value="1">Total Cases</option>
                            <option value="2">New Cases</option>
                            <option value="3">Deaths</option>
                            <option value="4">Recovered</option>
                            <option value="5">Active</option>
                        </select>
                    </div>
                </div>

                <table className="table table-striped table-responsive-md">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>
                                {this.props.groupByCountry
                                    ? 'COUNTRY'
                                    : 'STATE'}
                            </th>
                            <th className="text-primary">TOTAL</th>
                            <th className="text-warning">NEW</th>
                            <th className="text-danger">DEATHS</th>
                            <th className="text-success">RECOVERED</th>
                            <th className="text-info">ACTIVE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dataDisplayed.map((entry, index) => {
                            return (
                                <tr key={entry[0]}>
                                    <td>
                                        {(this.state.currentPage - 1) *
                                            PAGE_SIZE +
                                            index +
                                            1}
                                    </td>
                                    <td>{entry[0]}</td>
                                    <td className="text-primary">
                                        {numeral(entry[1]).format('0,0')}
                                    </td>
                                    <td className="text-warning">
                                        {numeral(entry[2]).format('0,0')}
                                    </td>
                                    <td className="text-danger">
                                        {numeral(entry[3]).format('0,0')}
                                    </td>
                                    <td className="text-success">
                                        {numeral(entry[4]).format('0,0')}
                                    </td>
                                    <td className="text-info">
                                        {numeral(entry[5]).format('0,0')}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <div className="d-flex justify-content-center p-3">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={this.state.currentPage === 1}
                        onClick={() => this.toPage(true)}
                    >
                        Prev
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary ml-1"
                        disabled={
                            this.state.currentPage === this.state.totalPages
                        }
                        onClick={() => this.toPage(false)}
                    >
                        Next
                    </button>
                </div>
            </div>
        )
    }
}

export default List
