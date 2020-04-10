import React from 'react';

//import { IHomeProps, IHomeState } from './types';

interface IHomeProps { }
interface IHomeState { }

class Home extends React.PureComponent<IHomeProps, IHomeState> {

    constructor(props: IHomeProps) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <>
                Home
            </>
        )

    }
}

export default Home