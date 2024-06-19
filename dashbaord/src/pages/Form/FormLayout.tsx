import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import PopupPreview from '../../components/PopupPreview';

const FormLayout = () => {
  const [popupMessage, setPopupMessage] = useState('');
  const [popupColor, setPopupColor] = useState('#ffffff');
  const [popupCorner, setPopupCorner] = useState('top-right');

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Form Layout" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div>
            <form id="popupForm" onSubmit={handleFormSubmit}>
              <div className="p-6.5">

                <div className="mb-4.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Popup Message <span className="text-meta-1">*</span>
                  </label>
                  <input
                    id="popupMessage"
                    type="text"
                    placeholder="Enter your message"
                    value={popupMessage}
                    onChange={(e) => setPopupMessage(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Popup Color
                  </label>
                  <input
                    id="popupColor"
                    type="color"
                    value={popupColor}
                    onChange={(e) => setPopupColor(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Popup Corner
                  </label>
                  <select
                    id="popupCorner"
                    value={popupCorner}
                    onChange={(e) => setPopupCorner(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="top-right">Top Right</option>
                    <option value="top-left">Top Left</option>
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                  </select>
                </div>

                <button
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Generate Popup
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Popup Preview --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Popup Preview
              </h3>
            </div>
            <div
              className="flex items-center justify-center p-6.5"
              style={{ height: '300px' }}
            >
              <PopupPreview message={popupMessage} color={popupColor} />
            </div>
          </div>        
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;