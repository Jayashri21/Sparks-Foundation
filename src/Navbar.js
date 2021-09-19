import React from 'react';
import {Link} from 'react-router-dom';
import card1 from './Images/bank.png';
import card2 from './Images/img_2.png';
class Navbar extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <React.Fragment>
                <nav className="sticky-top navbar navbar-expand-lg navbar-light bg-secondary">
                    <Link className="navbar-brand text-white" to="/"><h2 className="display-6 font-weight-normal"> <img src={card1} alt="my" width="10%" height="10%"/> Spark Bank</h2></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="ggnavbarSupportedContent">
                        <ul className="navbar-nav ml-4">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link text-white border border-white px-5 mx-3"><h2>Home</h2><span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/customer/create" className="nav-link text-white border border-white px-5 mx-3" href="#"><h2>Create</h2></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/customer" className="nav-link text-white border border-white px-5 mx-3" href="#"><h2>Admin</h2></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/customer/create/history" className="border border-white nav-link text-white px-5 mx-3" href="#"><h2>History</h2></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        );
    }


}

export default Navbar;