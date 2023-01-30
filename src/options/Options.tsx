import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Options as OptionsType, optionsStorage } from '../logic/storage';

export default function Options() {
  const { t } = useTranslation();

  const [options, setOptions] = useState<OptionsType | null>(null);
  useEffect(() => {
    async function getOptions() {
      const options = await optionsStorage.get();
      console.log('get options', options);
      setOptions(options);
    }
    getOptions();
  }, []);

  const onChangeDirectOpen = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (options) {
        const newOptions: OptionsType = { directOpen: e.target.checked };
        setOptions(newOptions);
        optionsStorage.set(newOptions);
      }
    },
    [options],
  );

  return (
    <>
      <Helmet>
        <html lang={navigator.language} />
      </Helmet>
      <div className="justify-center bg-gray-100 w-screen h-screen pt-30">
        <div className="w-full max-w-[600px] mx-auto rounded shadow bg-white p-4">
          <h1 className="flex items-center justify-center pb-3 mb-3 text-3xl border-b-1">
            <img src="/favicon.svg" className="h-[1em] mr-1" />
            Options
          </h1>
          <div className="flex justify-center">
            <input
              type="checkbox"
              id="openDirect"
              checked={(options || optionsStorage.defaultValue).directOpen}
              onChange={onChangeDirectOpen}
            />
            <label htmlFor="openDirect" className="ml-1 text-base">
              {t('Open URL Directly')}
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
