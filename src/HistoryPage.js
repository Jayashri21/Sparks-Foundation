import React from 'react';
import Axios from "axios";
import {Link, Redirect} from "react-router-dom";
import Transfer from "./Transfer";
class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                history: [],
                c:0
            }
    }

    componentDidMount() {
        /*History */
        let dataURL3 = "http://localhost:5000/api/history";
        Axios.get(dataURL3).then((response) => {

            this.setState(
                {
                    ...this.state,
                    history: response.data.History
                });
        }).catch((e) => {
            console.log(e);
        })
    }
    render() {
        return (
            <React.Fragment>
                <section className="p-3 landing-page2">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h2 className=" font-weight-normal display-3">Transition History</h2>
                            </div>
                        </div>
                    </div>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col">
                                <table className="table table-success text-center table-hover table-striped">
                                    <thead className="bg-dark text-white">
                                    <tr>
                                        <th className="font-weight-bold">SrNo</th>
                                        <th className="font-weight-bold">Sender Name</th>
                                        <th className="font-weight-bold">Receiver Name</th>
                                        <th className="font-weight-bold">Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.history.length > 0 ?
                                            this.state.history.map((product)=>
                                            {

                                                return(
                                                    this.state.c+=1,
                                                    <tr  className="btn-table " key={product._id}>
                                                        <td className="font-weight-bold">{this.state.c}</td>
                                                        <td className="font-weight-bold">{product.sendername}</td>
                                                        <td className="font-weight-bold">{product.receivername}</td>
                                                        <td className="font-weight-bold">{product.amount}</td>
                                                    </tr>
                                                )
                                            })
                                            :null
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default HistoryPage;