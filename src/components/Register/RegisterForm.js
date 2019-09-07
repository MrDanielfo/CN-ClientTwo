import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Formik } from 'formik';


const RegisterForm = ({ handleSubmit }) => {

    return (
      <Fragment>
        <div className="row my-2">
          <h2 className="text-center mt-4">Registra tus datos</h2>
          <Formik
            initialValues={{ name: '', lastName: '', email: '', password: '', gender: '' }}
            validate={values => {
              let errors = {};
              if (!values.name) {
                  errors.name = 'Tu nombre es obligatorio'
              }
              if (!values.lastName) {
                errors.lastName = 'Tu apellido es obligatorio';
              }
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              if (!values.password) {
                errors.password = 'inserta un password';
              }
              if (!values.gender || values.gender === '') {
                errors.gender = 'Debes seleccionar un género';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                handleSubmit(values);
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
                    <label>Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="form-group">
                    <label>Apellidos</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
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

                  <div className="form-group">
                    <label>Género</label>
                    <select
                      multiple=""
                      className="form-control"
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Selecciona un género</option>
                      <option value="HOMBRE">Hombre</option>
                      <option value="MUJER">Mujer</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Registrarse
                  </button>
                </form>
              </div>
            )}
          </Formik>
        </div>
      </Fragment>
    );
}

RegisterForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default RegisterForm;
