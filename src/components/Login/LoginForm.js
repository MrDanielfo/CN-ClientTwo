import React from 'react';
import PropTypes from 'prop-types'
import { Formik } from 'formik'


const LoginForm = ({ handleSubmit }) => {

    return (
        <div className="row my-5">
            <h2 className="text-center mt-4">Inicia Sesión</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    let errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = "insetaun password"
                    }
                    return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        handleSubmit(values)
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <div className="col-md-10 mt-2">
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                            </div>
                            {errors.email && touched.email && errors.email}
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                            </div>
                            {errors.password && touched.password && errors.password}
                            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                Iniciar Sesión
                            </button>
                        </form>
                    </div>
                )}
            </Formik>
        </div>
        
    );
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default LoginForm;
