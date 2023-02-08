'use client';
import styles from './page.module.css';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { BASE_API_URL, API_VERSION } from '../config';

export default function Home() {
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
            date: undefined,
            vendorName: undefined,
            file: undefined
          }}
          onSubmit={async values => {
            const formData = new FormData();
            formData.append('date', values.date || '');
            formData.append('vendorName', values.vendorName || '');
            formData.append('file', values.file || '');
            try {
              const res = await axios.post(
                `${BASE_API_URL}/api/${API_VERSION}/purchases/validation`,
                formData
              );
              if (res.data.isValid === true) {
                alert('Upload successfully!! This is a valid data!');
              } else {
                alert('Upload failed! This is not an valid data!');
              }
            } catch {
              alert('Something went wrong');
            }
          }}
          validationSchema={yup.object().shape({
            date: yup.date().required(),
            vendorName: yup.string().required(),
            file: yup.mixed().required()
          })}
        >
          {({ errors, handleSubmit, setFieldValue }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor='date'>Date : </label>
                  <input
                    type='date'
                    onChange={e => {
                      setFieldValue('date', e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor='date'>Vendor Name : </label>
                  <input
                    type='text'
                    onChange={e => {
                      setFieldValue('vendorName', e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor='date'>Details File : </label>
                  <input
                    type='file'
                    onChange={e => {
                      console.log(e.target.files);
                      console.log(errors);
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
