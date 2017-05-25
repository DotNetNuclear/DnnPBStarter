import React, { Component, PropTypes }  from "react";
import { connect } from "react-redux";
import PersonaBarPageHeader from "dnn-persona-bar-page-header";
import PersonaBarPage from "dnn-persona-bar-page";
import Button from "dnn-button";
import ItemList from "./ItemList";
import resx from "localization";

class App extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
    }

    onCreate() {
        this.refs["itemPanel"].getWrappedInstance().onAddItem();
    }

    render() {
        return (
            <div className="pbstarter-app">
                <PersonaBarPage isOpen="true">
                    <PersonaBarPageHeader title={resx.get("nav_PBStarter")}>
                    {
                        <Button type="primary" size="large" onClick={this.onCreate.bind(this)} title={resx.get("btnNewItem")}>
                            {resx.get("btnNewItem") }
                        </Button>
                    }
                    </PersonaBarPageHeader>
                    <ItemList ref="itemPanel"/>
                </PersonaBarPage>
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    items: PropTypes.array
};

function mapStateToProps(state) {
    return {
        items: state.items.list
    };
}

export default connect(mapStateToProps)(App);