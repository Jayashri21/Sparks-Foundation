import React from 'react';
class Home extends React.Component{
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <React.Fragment>
                <div className="landing-page">
                    <div className="wrapper">
                        <div className="d-flex flex-column justify-content-center text-center align-content-center h-100 ">
                            <div className="display-2  ">Banking  ONLINE</div><br/>
                            <h1>Developed By Jayashri Gajjam</h1>
                            <div className="lead "><h2>Mobile devices, high-speed data communication, and online commerce are creating expectations that convenient, secure, real-time payment and banking capabilities should be available whenever and wherever they are needed.
                               </h2></div>
                            <div className="lead"><h2> </h2></div><br/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }


}

export default Home;