import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import classNames from 'classnames';
import jsQR from 'jsqr';

import { optionsStorage } from '../logic/storage';

export default function Popup() {
  const [gettingDisplayMedia, setGettingDisplayMedia] = useState(false);

  const [message, setMessage] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);

  const loadQr = useCallback(async (video: HTMLVideoElement) => {
    if (!video.videoWidth || !video.videoHeight) {
      requestAnimationFrame(() => loadQr(video));
      return;
    }

    const width = video.videoWidth;
    const height = video.videoHeight;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.drawImage(video, 0, 0, width, height);

    const stream = video.srcObject as MediaStream | null;
    stream?.getTracks().forEach((track) => track.stop());
    video.srcObject = null;

    const code = jsQR(
      context.getImageData(0, 0, width, height).data,
      width,
      height,
    );
    if (code) {
      const options = await optionsStorage.get();
      if (options.directOpen) {
        window.open(code.data, '_blank');
      } else {
        setLink(code.data);
      }
    } else {
      setMessage('Not Found QR Code');
    }
  }, []);

  useEffect(() => {
    async function capture() {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          audio: false,
          video: {
            // @ts-expect-error: unknown property
            cusor: 'never',
            displaySurface: 'window',
          },
        });

        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        requestAnimationFrame(() => loadQr(video));
      } catch {
        window.close();
      } finally {
        setGettingDisplayMedia(false);
      }
    }
    if (gettingDisplayMedia) {
      capture();
    }
  }, [gettingDisplayMedia, loadQr]);

  useEffect(() => {
    setGettingDisplayMedia(true);
  }, []);

  return (
    <>
      <Helmet>
        <html lang={navigator.language} />
      </Helmet>
      <div
        className={classNames(
          'flex',
          'items-center',
          'justify-center',
          'py-4',
          'px-9',
          'text-base',
          gettingDisplayMedia && ['w-[800px]', 'h-[600px]'],
        )}
      >
        {message && <div className="whitespace-nowrap">{message}</div>}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-800 underline flex-inline items-center"
          >
            {link}
            <i className="i-mdi-open-in-new ml-1" />
          </a>
        )}
      </div>
    </>
  );
}
