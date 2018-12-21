import React from "react";
import ErrorTile from "./ErrorTile";

export default class TileErrorBoundary extends React.Component {
    state = {
        hasError: false
    };

    componentDidCatch() {
        this.setState({hasError: true});
    }

    render() {
        const {children} = this.props;
        const {hasError} = this.state;
        if (hasError) {
            return <ErrorTile />;
        }

        return children;
    }
}
