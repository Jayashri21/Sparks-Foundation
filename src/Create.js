import React from 'react';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

class Create extends React.Component{
    constructor(props) {
        super(props);
        this.state =
            {
                product:
                    {
                        name: '',
                        email: '',
                        info: ''
                    },
                IsSubmit : false
            }
    }
    UpdateCreate = (event) => {
        this.setState(
            {
                ...this.state,
                product:
                    {
                        ...this.state.product,
                        [event.target.name]: event.target.value,
                        [event.target.email]: event.target.value,
                        [event.target.info]: event.target.value
                    }
            }
        )
    };

    Submitted = (e) =>
    {

        e.preventDefault();
        let dataURL = 'http://localhost:5000/api/product';
        Axios.post(dataURL,this.state.product).then((res)=>
        {
            console.log(res.data.msg);
            this.setState(
                {
                    ...this.state,
                    IsSubmit : true
                }
            )
        }).catch((e)=>
        {
            console.log(e);
        });
    };
    render() {
        return (
            <React.Fragment>
                {
                    this.state.IsSubmit ? <Redirect to="/customer"/> :
                        <React.Fragment>
                            <section className="p-3 landing-page2">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <h2 className="text text-info display-3 mb-5 font-weight-normal">Create New User</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="container  mt-5">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="card">
                                                <div className="card-header bg-info text-white">
                                                    <h3>CREATE NEW</h3>
                                                </div>
                                                <div className="card-body my-5">
                                                    <form onSubmit={this.Submitted}>
                                                        <div className="form-group">
                                                            <input
                                                                onChange={this.UpdateCreate}
                                                                name='name'
                                                                value={this.state.product.name}
                                                                className="form-control" type='text' placeholder="Name"/>
                                                        </div>
                                                        <div className="form-group">
                                                            <input
                                                                onChange={this.UpdateCreate}
                                                                name='email'
                                                                value={this.state.product.email}
                                                                className="form-control" type='text' placeholder="Email"/>
                                                        </div>
                                                        <div className="form-group">
                                                            <input
                                                                onChange={this.UpdateCreate}
                                                                name='qty'
                                                                value='0.00'
                                                                className="form-control" type='text' placeholder="Current Balance"/>
                                                        </div>
                                                        <div className="form-group">
                                                <textarea
                                                    onChange={this.UpdateCreate}
                                                    name='info'
                                                    value={this.state.product.info}
                                                    rows="3" className="form-control" placeholder="information"/>
                                                        </div>
                                                        <div>
                                                            <input type="submit" className="btn btn-info mt-5 btn-lg" value="Create"/>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </React.Fragment>
                }
            </React.Fragment>
        );
    }
}
export default Create;