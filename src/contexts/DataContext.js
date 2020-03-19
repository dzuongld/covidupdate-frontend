import React from 'react'
import Loader from '../components/Loader'

const Context = React.createContext({})

export class DataContext extends React.Component {
    state = { data: {}, loading: true }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/data`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({ data: data, loading: false })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        if (this.state.loading) return <Loader />
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default Context
