import React, { Component, Children } from "react";
import PropTypes from "prop-types";

class Translate extends Component {
    getChildContext() {
        return {
            t: key => this.props.i18n[key] || ""
        };
    }
    render() {
        // `Children.only` enables us not to add a <div /> for nothing
        return Children.only(this.props.children);
    }
}
Translate.propTypes = {
    t: PropTypes.object.isRequired
};
Translate.childContextTypes = {
    t: PropTypes.object.isRequired
};
export default Translate;