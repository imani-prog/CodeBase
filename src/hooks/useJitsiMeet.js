// src/hooks/useJitsiMeet.js
import { useEffect, useRef, useCallback } from 'react';

const JITSI_DOMAIN = 'meet.jit.si';

export const useJitsiMeet = ({ roomName, containerRef, userInfo, onReady, onLeft }) => {
  const apiRef = useRef(null);

  const dispose = useCallback(() => {
    if (apiRef.current) {
      apiRef.current.dispose();
      apiRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!roomName || !containerRef?.current) return;

    const initJitsi = () => {
      dispose();

      apiRef.current = new window.JitsiMeetExternalAPI(JITSI_DOMAIN, {
        roomName: `medilink-${roomName}`,
        parentNode: containerRef.current,
        width: '100%',
        height: '100%',
        userInfo: {
          displayName: userInfo?.displayName || 'User',
          email: userInfo?.email || '',
        },
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          disableDeepLinking: true,
          enableWelcomePage: false,
          prejoinPageEnabled: false,  // skip lobby for simplicity
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: ['microphone', 'camera', 'hangup', 'tileview', 'fullscreen'],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          MOBILE_APP_PROMO: false,
        },
      });

      apiRef.current.addEventListener('videoConferenceJoined', () => onReady?.());
      apiRef.current.addEventListener('readyToClose', () => {
        dispose();
        onLeft?.();
      });
    };

    // Load external_api.js once, then init
    if (window.JitsiMeetExternalAPI) {
      initJitsi();
    } else {
      const existing = document.getElementById('jitsi-api');
      if (existing) {
        existing.addEventListener('load', initJitsi);
        return dispose;
      }
      const script = document.createElement('script');
      script.id = 'jitsi-api';
      script.src = `https://${JITSI_DOMAIN}/external_api.js`;
      script.onload = initJitsi;
      document.head.appendChild(script);
    }

    return dispose;
  }, [roomName]);

  return { apiRef, dispose };
};