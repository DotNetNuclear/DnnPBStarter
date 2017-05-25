import React, {Component, PropTypes } from "react";
import { connect } from "react-redux";
import util from "../../../utils";
import resx from "../../../localization";
import Grid from "dnn-grid-system";
import FileUpload from "dnn-file-upload";
import Button from "dnn-button";
import Switch from "dnn-switch";
import SingleLineInputWithError from "dnn-single-line-input-with-error";
import MultiLineInput from "dnn-multi-line-input";
import Label from "dnn-label";
import ItemActions from "actions/ItemActions";

import "./style.less";

class ItemEditor extends Component {
    constructor(props) {
        super(props);
        let itemDetails = Object.assign({}, props.itemDetails);
        this.state = {
            itemDetails: props.itemId !== -1 ? itemDetails : {
                id: -1,
                name: "",
                description: ""
            },
            errors: {
                Name: false
            },
            formModified: false
        };
        this.submitted = false;
    }

    onTextChange(key, event) {
        this.performChange(key, event.target.value);
    }

    performChange(key, value) {
        let {itemDetails} = this.state;
        itemDetails[key] = value;
        this.setState({
            itemDetails
        });
        let {state} = this;
        state.formModified = true;
        this.setState({
            state
        }, () => {
            this.validateForm();
        });
    }

    onSwitchToggle(key, status) {
        this.performChange(key, status);
    }

    addUpdateItem(event) {
        event.preventDefault();
        const {props, state} = this;
        this.submitted = true;
        if (!this.validateForm()) {
            return;
        }

        if (state.formModified) {
            let {itemDetails} = this.state;
            let successMsg = resx.get("ItemAdded.Message");
            let errorMsg = resx.get("ItemAdded.Error");
            if (props.itemId > 0) {
                successMsg = resx.get("ItemUpdated.Message");
                errorMsg = resx.get("ItemUpdated.Error");
            }
            props.dispatch(ItemActions.saveItem(itemDetails, () => {
                util.notify(successMsg);
                props.Collapse(event);
                props.refreshItems();
            }, () => {
                util.notify(errorMsg);
            }));
        }
        else {
            props.Collapse(event);
        }
    }

    validateForm() {
        let valid = true;
        if (this.submitted) {
            let {itemDetails} = this.state;
            let {errors} = this.state;
            errors.Name = false;
            if (itemDetails.name === "") {
                errors.Name = true;
                valid = false;
            }
            this.setState({ errors });
        }
        return valid;
    }

    deleteItem(event) {
        let {itemDetails} = this.state;
        const {props} = this;
        if (props.itemId > 0) {
            util.confirm(resx.get("DeleteItem.Confirm"), resx.get("Delete"), resx.get("Cancel"), () => {
                props.dispatch(ItemActions.deleteItem(itemDetails, () => {
                    util.notify(resx.get("DeleteItem.Message"));
                    props.Collapse(event);
                    props.refreshItems();
                }));
            });
        }
        else {
            util.notify(resx.get("DeleteInconsistency.Error"));
        }
    }
    /* eslint-disable react/no-danger */
    render() {
        let {state} = this;
        let {itemDetails} = this.state;
        const utilities = {
            utilities: util
        };

        const columnOne = <div className="editor-container">
            <div className="editor-row divider">
                <SingleLineInputWithError
                    value={state.itemDetails.name }
                    onChange={this.onTextChange.bind(this, "name") }
                    maxLength={50}
                    error={state.errors.Name}
                    label={resx.get("Name") }
                    tooltipMessage={resx.get("Name.Help") }
                    errorMessage={resx.get("Name.Required") }
                    autoComplete="off"
                    inputStyle={{ marginBottom: 15 }}
                    tabIndex={1}/>
            </div>
            <div className="editor-row divider">
                <Label label={resx.get("Description") } tooltipMessage={resx.get("Description.Help") } tooltipPlace={"top"} />
                <MultiLineInput value={state.itemDetails.description } onChange={this.onTextChange.bind(this, "description") }
                    tabIndex={2} maxLength={1000} />
            </div>
        </div>;

        let children = [];
        children.push(columnOne);
        /* eslint-disable react/no-danger */
        return (
            <div className="item-details-editor">
                <Grid children={children} numberOfColumns={2} />
                <div className="buttons-box">
                {
                    this.props.itemId > 0 && (state.itemDetails.id > -1) ?
                        <Button type="secondary" onClick={this.deleteItem.bind(this) }>
                            {resx.get("Delete") }
                        </Button>
                        : null
                }
                <Button type="secondary" onClick={this.props.Collapse.bind(this) }>{resx.get("Cancel") }</Button>
                <Button type="primary" onClick={this.addUpdateItem.bind(this) }>{resx.get("Save") }</Button>
                </div>
            </div >
            );
        }
}
ItemEditor.propTypes = {
    dispatch: PropTypes.func.isRequired,
    itemId: PropTypes.number,
    itemDetails: PropTypes.object,
    Collapse: PropTypes.func,
    refreshItems: PropTypes.func,
    onChangeField: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {  };
}

export default connect(mapStateToProps)(ItemEditor);
