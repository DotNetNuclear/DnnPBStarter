import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import PersonaBarPageBody from "dnn-persona-bar-page-body";

export class Body extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <PersonaBarPageBody>
                <h1>PB Starter</h1>
            </PersonaBarPageBody>
        );
    }
}
