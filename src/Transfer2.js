import React from 'react';
import Axios from "axios";
import {Link, Redirect} from "react-router-dom";
class Transfer extends React.Component{
    constructor(props) {
        super(props);
        this.state =
            { productId: this.props.match.params.product_id,
                products: {},
                users : [],
                user2 : {},
                IsSubmit : true,
                AllUser : [],
                Id : 0,
                amount : 0,
                upload : false
            }

    }
    componentDidMount() {
        let dataURL = `http://127.0.0.1:5000/api/product/${this.state.productId}`;
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

        let dataURL2 =  "http://127.0.0.1:5000/api/product";
        Axios.get(dataURL2).then((response) =>
        {
            console.log(response.data.Product)
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
    Update = (e) =>
    {
        this.setState({
            ...this.state,
            Id : e.target.value

        })
        if(this.state.users.length > 0)
        {
            this.state.users.map((us) => {
                if (us._id === this.state.Id) {
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
    UpdateAmount(event)
    {
        event.preventDefault();
        const amount = event.target.elements.amount.value;
        this.Update2(amount);
        this.UploadMany(this.state.products,this.state.user2);
    }

    /* Update Many */
    UploadMany = (products,user2) => {
        let dataURL = `http://127.0.0.1:5000/api/product/${this.state.productId}`;
        let dataURL2 = `http://127.0.0.1:5000/api/product/${this.state.Id}`;

        Axios.all([
            Axios.put(dataURL, {products}),
            Axios.put(dataURL2, {user2})
        ]).then(Axios.spread((data1, data2) => {
            // output of req.
            console.log('data1', data1, 'data2', data2)
        }));
    }
    /*End*/


    /* Upload = () =>
     {
         let dataURL = `http://127.0.0.1:5000/api/product/${this.state.productId}`;
         Axios.put(dataURL,this.state.products).then((res)=>
         {
            console.log(this.state.productId)
         }).catch((e)=>
         {
             console.log(e);
         });
     }
     Upload2 = () =>
     {
         let dataURL = `http://127.0.0.1:5000/api/product/${this.state.Id}`;
         Axios.put(dataURL,this.state.user2).then((res)=>
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
     }*/
    Update2(amount)
    {
        console.log(amount)
        if (this.state.products.curr_bal - amount >= 0 && amount >= 0) {
            this.setState(
                {
                    products:
                        {
                            ...this.state.products,
                            curr_bal: this.state.products.curr_bal - amount
                        },
                    user2:
                        {
                            ...this.state.user2,
                            curr_bal: this.state.user2.curr_bal + amount
                        },
                    upload: true
                }
            )
        }
        else
        {
            alert("jo");
        }

    }
    render() {
        return (
            <React.Fragment>
                <h3 className="display-3 ">USER DETAILS</h3>
                <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, corporis deleniti eius exercitationem laudantium minima molestias rerum tempora voluptate voluptates.</h3>
                {
                    this.state.IsSubmit > 0 ? <section>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card m-3">
                                        <div className="card-header bg-secondary text-white">User Details</div>
                                        <div className="card-body rgba-purple-light">
                                            {
                                                Object.keys(this.state.products).length > 0 ?
                                                    <form onSubmit={this.Submit}>
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
                                <div className="card m-3 mx-auto">
                                    <div className="card-header bg-secondary text-white">MONEY TRANSFER</div>
                                    <div className="card-body rgba-purple-light"> <form  onSubmit={this.UpdateAmount}>
                                        <div className="form-group">
                                            <label >Sender : </label>
                                            <input
                                                name = "sender"
                                                value={this.state.products.name}
                                                className="form-control" type='text' />
                                        </div>
                                        <div className="form-group">
                                            <label >Receiver : </label>
                                            <select className="form-control" name="city" onChange={this.Update.bind(this)}>
                                                <option selected>Select Receiver</option>
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
                                                value={this.state.amount}
                                                className="form-control" type="text" pattern="[0-9]*" placeholder="Amount"/>
                                        </div>
                                        <input onClick={this.onSubmit.bind(this)} className="btn btn-secondary btn-sm" value="Update"/>
                                    </form></div>

                                </div>
                            </div>
                        </div>
                    </section> : <Redirect to="/customer"/>
                }
            </React.Fragment>
        );
    }


}

export default Transfer;