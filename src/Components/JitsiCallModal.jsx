// src/components/JitsiCallModal.jsx
import { useRef, useEffect } from 'react';
import { X, Video } from 'lucide-react';
import { useJitsiMeet } from '../hooks/useJitsiMeet';

const JitsiCallModal = ({ isOpen, onClose, roomName, userInfo, title }) => {
  const containerRef = useRef(null);

  const { dispose } = useJitsiMeet({
    roomName: isOpen ? roomName : null,
    containerRef,
    userInfo,
    onLeft: onClose,
  });

  // Cleanup when modal is force-closed from outside
  useEffect(() => {
    if (!isOpen) dispose();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 text-white flex-shrink-0">
        <div className="flex items-center gap-2">
          <Video className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium truncate">{title || 'Video Consultation'}</span>
        </div>
        <button
          onClick={() => { dispose(); onClose(); }}
          className="p-1.5 hover:bg-gray-700 rounded transition-colors"
          title="Leave call"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Jitsi fills the rest of the screen */}
      <div ref={containerRef} className="flex-1 w-full" />
    </div>
  );
};

export default JitsiCallModal;