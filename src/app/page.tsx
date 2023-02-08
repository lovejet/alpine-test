'use client';
import styles from './page.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

export default function Home() {
  const handleSubmit = () => {};

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Alpine Home Assignment</p>
        <div>
          <a
            href='https://lovejetpad.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
          >
            By lovejet
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Formik
          initialValues={{
            date: null,
            vendorName: null,
            file: null
          }}
          onSubmit={values => {
            // console.log(values);
          }}
          validationSchema={yup.object().shape({
            date: yup.date().required(),
            venorName: yup.string().required(),
            file: yup.mixed().required()
          })}
        >
          {({ values, handleSubmit, setFieldValue }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor='date'>Date : </label>
                  <input
                    type='date'
                    value={values.date || ''}
                    onChange={e => {
                      setFieldValue('date', e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor='date'>Vendor Name : </label>
                  <input
                    type='text'
                    value={values.vendorName || ''}
                    onChange={e => {
                      setFieldValue('vendorName', e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor='date'>Details File : </label>
                  <input
                    type='file'
                    value={values.file || ''}
                    onChange={e => {
                      setFieldValue(
                        'file',
                        e.target.files ? e.target.files[0] : null
                      );
                    }}
                  />
                </div>
                <input type='submit' className='submitButton' />
              </Form>
            );
          }}
        </Formik>
      </div>

      <div className={styles.grid}></div>
    </main>
  );
}
