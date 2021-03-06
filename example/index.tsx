import * as React from "react";
import * as ReactDOM from "react-dom";

import ReactToPrint from "../src/index";
import ComponentToPrint from "./ComponentToPrint";
import "./relativecss/test.css";

interface State {
    text: string;
    isLoading: boolean;
}

class Example extends React.Component<{}, State> {
    private componentRef!: ComponentToPrint;

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            text: "000000000",
            isLoading: false
        };
    }

    private handleAfterPrint = () => console.log("after print!"); // tslint:disable-line no-console
    private handleBeforePrint = () => this.setState({ isLoading: false});
    private renderContent = () => this.componentRef;
    private renderTrigger = () => <button type="button">Print this out!</button>;
    private onBeforeGetContent = () => {
        return new Promise((resolve: any) =>
            this.setState({ text: "text changed", isLoading: true }, resolve)
        );
    };

    setRef = (ref: ComponentToPrint) => this.componentRef = ref;

    render() {
        return (
            <div>
                {this.state.isLoading && <p className="indicator">Loading...</p>}
                <ReactToPrint
                    documentTitle={"Awesome_FileName"}
                    trigger={this.renderTrigger}
                    content={this.renderContent}
                    onBeforeGetContent={this.onBeforeGetContent}
                    onBeforePrint={this.handleBeforePrint}
                    onAfterPrint={this.handleAfterPrint}
                    removeAfterPrint
                />
                <ComponentToPrint ref={this.setRef} text={this.state.text}/>
            </div>
        );
    }
}

ReactDOM.render(<Example/>, document.getElementById("app-root"));
