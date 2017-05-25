import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import PersonaBarPageBody from "dnn-persona-bar-page-body";
import HeaderRow from "./HeaderRow";
import DetailRow from "./DetailRow";
import ItemActions from "actions/ItemActions";
import ItemEditor from "./ItemEditor";
import CollapsibleSwitcher from "../common/CollapsibleSwitcher";
import resx from "localization";

import "./style.less";

class ItemList extends Component {
    constructor() {
        super();

        this.state = {
            openId: "",
            renderIndex: -1,
            parameter: { }
        };
    }

    componentWillMount() {
        this.refreshItems();
    }

    //componentWillReceiveProps(newProps) {
    //}

    refreshItems() {
        const {props, state} = this;
        props.dispatch(ItemActions.getItems(state.parameter, (data) => {
            let items = Object.assign([], data.Results);
            this.setState({ items });
        }));
    }

    uncollapse(id, index) {
        setTimeout(() => {
            this.setState({
                openId: id,
                renderIndex: index
            });
        }, this.timeout);
    }
    collapse() {
        if (this.state.openId !== "") {
            this.setState({
                openId: "",
                renderIndex: -1
            });
        }
    }
    toggle(openId, index) {
        if (openId !== "") {
            this.uncollapse(openId, index);
        } else {
            this.collapse();
        }
    }

    renderedItems() {
        if (this.props.items.totalCount > 0) {
            let i = 0;
            return this.props.items.list.map((item, index) => {
                let id = "row-" + i++;
                let children = [
                    <div />,
                    <ItemEditor
                        itemDetails={item}
                        onChangeField={ItemActions.changePageField}
                        refreshItems={this.refreshItems.bind(this)}
                        itemId={item.id}
                        Collapse={this.collapse.bind(this)}
                    />];
                return (
                    <DetailRow
                        name={item.name}
                        description={item.description}
                        index={index}
                        key={"item-" + index}
                        closeOnClick={true}
                        openId={this.state.openId}
                        currentIndex={this.state.renderIndex}
                        OpenCollapseEditItems={this.toggle.bind(this, id, 1)}
                        Collapse={this.collapse.bind(this, id)}
                        id={id}>
                        <CollapsibleSwitcher children={children} renderIndex={this.state.renderIndex} />
                    </DetailRow>
                );
            });
        } else {
            return <div className="no-users-row">{resx.get("NoData")}</div>;
        }
    }

    onAddItem() {
        this.toggle(this.state.openId === "add" ? "" : "add", 1);
    }

    render() {
        let opened = (this.state.openId === "add");
        let children = [
            <div />,
            <ItemEditor
                itemId={-1}
                onChangeField={ItemActions.changePageField}
                refreshItems={this.refreshItems.bind(this)}
                Collapse={this.collapse.bind(this)}
            />];
        return (
            <PersonaBarPageBody className=""/*{styles.itemList}*/ >
                <HeaderRow />
                <div className="add-setting-editor">
                    <DetailRow
                        name={"-"}
                        index={"add"}
                        key={"item-add"}
                        closeOnClick={true}
                        openId={this.state.openId}
                        currentIndex={this.state.renderIndex}
                        OpenCollapseEditItems={this.toggle.bind(this, "add", 1)}
                        Collapse={this.collapse.bind(this, "add")}
                        id={"add"}
                        addIsClosed={!opened}>
                        {opened && <CollapsibleSwitcher children={children} renderIndex={this.state.renderIndex} />}
                    </DetailRow>
                </div>
                <div className="item-list-container">
                    {this.renderedItems()}
                </div>
            </PersonaBarPageBody>
        );
    }
}

ItemList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    items: PropTypes.array,
    loadMore: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        items: state.items,
        loadMore: state.loadMore
    };
}

export default connect(mapStateToProps, null, null, { withRef: true })(ItemList);
