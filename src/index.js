import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";
import ReactPanZoom from "@ajainarayanan/react-pan-zoom";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dx: 0,
      dy: 0,
      zoom: 1,
      data: makeData()
    };
  }

  zoomIn = () => {
    this.setState({
      zoom: this.state.zoom + 0.2
    });
  };

  zoomOut = () => {
    this.setState({
      zoom: this.state.zoom - 0.2
    });
  };

  updateData = () => {
    this.setState({
      data: this.state.data.filter(de => {
        return de.firstName.includes("er") ? true : false;
      })
    });
  };

  removeData = d => {
    return d
      .filter(dat => {
        dat.includes("e");
      })
      .map({ ...d });
  };

  render() {
    const { data, zoom, dx, dy } = this.state;
    return (
      <div>
        <button onClick={this.zoomIn}>+</button>
        <button onClick={this.zoomOut}>-</button>
        <button onClick={this.updateData}>UPDATE</button>
        <ReactPanZoom zoom={zoom} pandx={dx} pandy={dy}>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Name",
                columns: [
                  {
                    Header: "First Name",
                    accessor: "firstName"
                  },
                  {
                    Header: "Last Name",
                    id: "lastName",
                    accessor: d => d.lastName
                  }
                ]
              },
              {
                Header: "Info",
                columns: [
                  {
                    Header: "Age",
                    accessor: "age"
                  },
                  {
                    Header: "Status",
                    accessor: "status"
                  }
                ]
              },
              {
                Header: "Stats",
                columns: [
                  {
                    Header: "Visits",
                    accessor: "visits"
                  }
                ]
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
          <Tips />
          <Logo />
        </ReactPanZoom>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
