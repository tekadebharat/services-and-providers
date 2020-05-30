import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Home';

class Home extends Component {

  componentDidMount() {
    // This method runs when the component is first added to the page
    this.props.getServices();
    this.props.getAllProviders();
  }

  render() {
    return (
      <div>
        <h1>Services</h1>
        {this.props.isLoading ? <span>Loading...</span> : []}
        {renderServices(this.props)}

        <h1>Providers</h1>
        {this.props.isLoading ? <span>Loading...</span> : []}
        {renderProviders(this.props)}
        
      </div>
    );
  }
}


function renderServices(props) {
  const { services } = props;
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {services && services.map(service =>
          <tr key={service.id}>
            <td>
              <Link onClick={() => props.filterProviders(service)} to={'#'}>{ service.attributes.name } </Link>
            </td>
            <td>{service.type}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function renderProviders(props) {
  const { allProviders } = props;
  if(allProviders && !allProviders.length) {
    return <div> No providers presents for selected service </div>
  }

  return (
    allProviders && allProviders.map(provider =>     
    <div className="card mb-3"  key={provider.id} style={{ maxWidth: '540px', padding: '15px'}}>
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src={provider.attributes['card-image']} className="card-img" alt={provider.id} />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{ provider.attributes.name }</h5>
          <ul className="card-text">
            {
              provider.attributes.subspecialties && provider.attributes.subspecialties.map(
                subspecialty =>
              <li> { subspecialty } </li>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  </div>
    )
  );
}

const mapStateToProps = (state) => ({
  services: state.homeReducer.services,
  allProviders: state.homeReducer.allProviders,
  isLoading: state.homeReducer.isLoading
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
