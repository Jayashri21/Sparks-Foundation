import React from 'react';
import Axios from "axios";
import {Link, Redirect} from "react-router-dom";
class Transfer extends React.Component{
    constructor(props) {
        super(props);
        this.state =
            {
                productId: this.props.match.params.product_id,
                products: {},
                users : [],
                user2 : {},
                user3 : {},
                IsSubmit : true,
                AllUser : [],
                history : [],
                Id : 0,
                amount : 0,
                upload : false
            }
            this.Upload = this.Upload.bind(this);

    }
    componentDidMount() {
        let dataURL = `http://localhost:5000/api/product/${this.state.productId}`;
        Axios.get(dataURL).then((res)=>
        {
            this.setState(
                {
                    ...this.state,
                    products : res.data.product
                }
            )

        }).catch((error)=>
        {
            console.log(error);
        })

        let dataURL2 =  "http://localhost:5000/api/product";
        Axios.get(dataURL2).then((response) =>
        {
            //console.log(response.data.Product)
            this.setState(
                {
                    ...this.state,
                    users : response.data.Product
                });
        }).catch((e)=>
        {
            console.log(e);
        })



    }

    /* Amount Update */
    UpdateAmount(e){
        this.setState(
            {
                ...this.state,
                amount:e.target.value
            }
        )
    }

    /*Get ID */
    UpdateId(e)
    {
       let Id2 = e.target.value
        if(this.state.users.length > 0)
        {
            this.state.users.map((us) => {
                if (us._id === Id2) {
                    this.setState(
                        {
                            ...this.state,
                            user2: us
                        }
                    )
                }
            })
        }
    }

    /* Onsubmit */
    Upload(event)
    {
        event.preventDefault();
        let amount = Number(event.target.amount.value) ;
        if (this.state.products.curr_bal - amount >= 0 && amount >= 0) {
            this.setState(
                {
                    products:
                        {
                            ...this.state.products,
                            curr_bal: Number(this.state.products.curr_bal) - amount
                        },
                    user2:
                        {
                            ...this.state.user2,
                            curr_bal: Number(this.state.user2.curr_bal) + amount
                        },
                    user3:
                            {
                                sendername : this.state.products.name,
                                receivername : this.state.user2.name,
                                amount : amount

                            }
                }
            )
        }
        else
        {
            alert("Amount Can't  Debit");
        }
        /*console.log(this.state.Id);*/
        setTimeout(this.Submit.bind(this),1000)
        event.preventDefault();
    }

    /*Final Submission to Sever */
    Submit = ()=>
    {
        /*console.log(this.state.user2);
        console.log(this.state.products);*/
        let productNew = this.state.products;
        let newUser2 = this.state.user2;
        let newUser3 = this.state.user3;
       let dataURL = `http://localhost:5000/api/product/${this.state.productId}`;
        let dataURL2 = `http://localhost:5000/api/product/${this.state.user2._id}`;
        let dataURL3 = "http://localhost:5000/api/history";
        Axios.put(dataURL,productNew).then((res)=>
        {
            console.log(res.data.msg);
        }).catch((e)=>
        {
            console.log(e);
        });
        Axios.put(dataURL2,newUser2).then((res)=>
        {
            console.log(res.data.msg);
            this.setState(
                {
                    ...this.state,
                }
            )
        }).catch((e)=>
        {
            console.log(e);
        });
        Axios.post(dataURL3,newUser3).then((res)=>
        {
            this.setState(
                {
                    ...this.state,
                    IsSubmit : false
                }
            )
        }).catch((e)=>
        {
            console.log(e);
        });
    }
    render() {
        return (
            <React.Fragment>
                <section className="landing-page2">
                <h3 className="display-3 text-center mb-5 font-weight-normal">USER DETAILS</h3>
                {
                    this.state.IsSubmit > 0 ? <section >
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card m-3">
                                        <div className="card-header bg-transfer text-white ">User Details</div>
                                        <div className="card-body rgba-purple-light">
                                            {
                                                Object.keys(this.state.products).length > 0 ?
                                                    <form onSubmit={this.Submit} className="my-4">
                                                            <div className="form-group">
                                                                <label >Account No</label>
                                                                <input
                                                                    name = "account"
                                                                    value={this.state.products._id.substr(this.state.products._id.length - 5)}
                                                                    className="form-control" type='text' />
                                                            </div>
                                                        <div className="form-group">
                                                            <label >Name</label>
                                                            <input
                                                                name = "name"
                                                                value={this.state.products.name}
                                                                className="form-control" type='text' placeholder="Name"/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label >Email Id</label>
                                                            <input
                                                                name = "email"
                                                                value={this.state.products.email}
                                                                className="form-control" type='text' />
                                                        </div>
                                                        <div className="form-group">
                                                            <label >Current Balance</label>
                                                            <input
                                                                name = "current"
                                                                value={this.state.products.curr_bal}
                                                                className="form-control" type='text' />
                                                        </div>
                                                        <div className="form-group">
                                                        </div>

                                                    </form> : null
                                            }
                                        </div>
                                    </div>
                                </div>
                                    <div className="card m-3  mx-auto cwidth">
                                        <div className="card-header bg-transfer text-white">MONEY TRANSFER</div>
                                        <div className="card-body rgba-purple-light">
                                            <form onSubmit={this.Upload.bind(this.state.user2)} >
                                                <div className="form-group ">
                                                    <label  >Sender : </label>
                                                    <input
                                                        name = "sender"
                                                        value={this.state.products.name}
                                                        className="form-control" type='text' />
                                                </div>
                                                <div className="form-group">
                                                    <label >Receiver : </label>
                                                    <select className="form-control" name="id" onChange={this.UpdateId.bind(this)} >
                                                        <option defaultValue>Select Receiver</option>
                                                        {
                                                            this.state.users.length > 0 ? this.state.AllUser = this.state.users.map(function (us) {
                                                                        return (
                                                                            <option key={us._id} value={us._id}>{us.name}</option>  // <h6 key={us._id}  className="dropdown-item"  href={us._id}>{us.name}</h6>
                                                                        )
                                                                    }
                                                                )
                                                                :null
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label>Amount : </label>
                                                    <input
                                                        name = "amount"
                                                        onChange={this.UpdateAmount.bind(this)}
                                                        value={this.state.amount}
                                                        className="form-control" type='text'  placeholder="Amount"/>
                                                </div>
                                                <input type="submit" className="btn btn-secondary mt-5" value="Update"/>
                                            </form></div>

                                    </div>
                            </div>
                        </div>
                    </section> : <Redirect to="/customer"/>
                }
                </section>
            </React.Fragment>
        );
    }


}

export default Transfer;