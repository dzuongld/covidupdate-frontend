import React, { Suspense } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import './App.css'
import Home from './components/Home'
import Map from './components/Map'
import NavBar from './components/NavBar'
import { DataContext } from './contexts/DataContext'
import Loader from './components/Loader'
import NewsFeed from './components/NewsFeed'

// lazy loading - downloaded on the fly
// const Home = React.lazy(() => import('./components/Home'))
// const NavBar = React.lazy(() => import('./components/NavBar'))
// const Map = React.lazy(() => import('./components/Map'))

class App extends React.Component {
    render() {
        return (
            <div>
                <DataContext>
                    <BrowserRouter>
                        <Suspense
                            fallback={
                                <div>
                                    <Loader />
                                </div>
                            }
                        >
                            <NavBar />
                            <div className="container">
                                <Switch>
                                    {/* stop when found a match */}
                                    <Route path="/" exact>
                                        <Home />
                                    </Route>
                                    <Route path="/map">
                                        <Map />
                                    </Route>
                                    <Route path="/news">
                                        <NewsFeed />
                                    </Route>
                                    {/* fall back */}
                                    <Redirect to="/"></Redirect>
                                </Switch>
                            </div>
                        </Suspense>
                    </BrowserRouter>
                </DataContext>
            </div>
        )
    }
}

export default App
