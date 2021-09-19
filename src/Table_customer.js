import React from 'react';
import {Link} from "react-router-dom";
import Axios from "axios";

class Table_customer extends React.Component{
    constructor(props) {
        super(props);
        this.state =
            {
                products:[],
                c:0
            }

    }

    componentDidMount() {
        let dataURL =  "http://localhost:5000/api/product";
        Axios.get(dataURL).then((response) =>
        {
            //console.log(response.data.Product[0])
            this.setState(
                {
                    products : response.data.Product
                });
        }).catch((e)=>
        {
            console.log(e);
        })

    }
    getAllProduct = () =>
    {
        let dataURL =  "http://localhost:5000/api/product";
        Axios.get(dataURL).then((response) =>
        {
            //console.log(response.data.Product[0])
            this.setState(
                {
                    products : response.data.Product
                });
        }).catch((e)=>
        {
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
                                <h2 className="font-weight-normal mb-5 display-3">All Users</h2>

                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <table className="table table-success text-center table-hover table-striped">
                                    <thead className="bg-dark text-white">
                                    <tr>
                                        <th>Id</th>
                                        <th>Account No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Current Balance</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.products.length > 0 ?
                                            this.state.products.map((product)=>
                                            {

                                                return(
                                                    this.state.c+=1,
                                                    <tr className="btn-table" key={product._id}>
                                                        <td className="font-weight-bold">{this.state.c}</td>
                                                        <td className="font-weight-bold">{product._id.substr(product._id.length - 5)}</td>
                                                        <td className="font-weight-bold">{product.name}</td>
                                                        <td className="font-weight-bold">{product.email}</td>
                                                        <td className="font-weight-bold">{product.curr_bal}</td>
                                                        <td className="font-weight-bold"><Link to={`/customer/${product._id}`}className="btn btn-primary">View Customer</Link></td>
                                                        {/*<td><Link  to={`/product/${product._id}`} className="btn btn-secondary">UPDATE</Link>  <button className="btn btn-danger" onClick={this.clickDelete.bind(this,product._id)}>Delete</button> </td>*/}
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
        );
    }
}
export default Table_customer;