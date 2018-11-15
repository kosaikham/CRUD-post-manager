import React, { Component } from 'react';

const lazyLoading = (importedComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            importedComponent()
                .then(cmp => this.setState({component: cmp.default}))
        }

        render(){
            let C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
}

export default lazyLoading;