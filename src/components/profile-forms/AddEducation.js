import React, {Fragment, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addEducation} from '../../actions/profile';

const AddEducation = ({addEducation, history, profile:{profile}}) => {
    const [formData, setFormData] = useState({
        profileId: profile.id,
        school: '',
        degree: '',
        fieldOfStudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
        profileId,
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
    } = formData;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async e => {
        e.preventDefault();
        addEducation(formData, history)
    }

    return (
    <Fragment>
        <h1 className="large text-primary">
        Add Your Education
        </h1>
        <p className="lead">
            <i className="fas fa-code-branch"></i> Add any school or bootcamp
             that you have attended
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="* School or bootcamp" 
                    name="school" 
                    value={school} 
                    onChange={(e) => onChange(e)} 
                    />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="* Degree or certificate" 
                    name="degree" 
                    value={degree}
                    onChange={(e) => onChange(e)} />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Field Of Study" 
                    name="fieldOfStudy" 
                    value={fieldOfStudy}
                    onChange={(e) => onChange(e)} />
            </div>
            <div className="form-group">
                <h4>From Date</h4>
                <input 
                    type="date" 
                    name="from" 
                    value={from}
                    onChange={(e) => onChange(e)} />
            </div>
            <div className="form-group">
                <p>
                    <input 
                        type="checkbox" 
                        name="current"
                        checked={current} 
                        value={current}
                        onChange={e => {
                            setFormData({
                                ...formData,
                                current: !current
                            });
                            toggleDisabled(!toDateDisabled);
                        }} />{' '}Current School
                </p>
            </div>
            <div className="form-group">
                <h4>To Date</h4>
                <input 
                    type="date" 
                    name="to" 
                    value={to}
                    onChange={(e) => onChange(e)}
                    disabled={toDateDisabled ? 'disabled' : ''} />
            </div>
            <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Program Description"
                    value={description}
                    onChange={(e) => onChange(e)}
                ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
        </form>
      </Fragment>
    );
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));