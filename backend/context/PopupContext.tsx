import React, { createContext, useContext, useState, ReactNode } from 'react';

type PopupType = 'info' | 'warning' | 'confirm' | 'logout' | 'feedback';

type PopupOptions = {
  type: PopupType;
  title: string;
  message: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type PopupContextType = {
  show: (options: PopupOptions) => void;
  hide: () => void;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) throw new Error("usePopup must be used within PopupProvider");
  return context;
};

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [popup, setPopup] = useState<PopupOptions | null>(null);

  const show = (options: PopupOptions) => setPopup(options);
  const hide = () => setPopup(null);

  const renderButtons = () => {
    if (!popup) return null;

    const commonBtn =
      <button onClick={hide} className="px-4 py-1 bg-gray-300 rounded">Close</button>;

    if (popup.type === 'confirm' || popup.type === 'logout') {
      return (
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => {
              popup.onCancel?.();
              hide();
            }}
            className="px-4 py-1 text-sm bg-gray-200 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              popup.onConfirm?.();
              hide();
            }}
            className="px-4 py-1 text-sm bg-mColor text-white rounded-xl"
          >
            تسجيل الخروج
          </button>
        </div>
      );
    }

    return <div className="mt-4 text-right">{commonBtn}</div>;
  };

  const getIcon = () => {
    switch (popup?.type) {
      case 'warning':
        return '⚠️';
      case 'confirm':
        return '✅';
      case 'logout':
        return '🔒';
      default:
        return '🪟';
    }
  };

  return (
    <PopupContext.Provider value={{ show, hide }}>
      {children}
      {popup && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-5 rounded-xl relative"
            style={{ boxShadow: " 0 0 0 1px rgba(2,0,3,.025), 0 16px 24px 0px rgba(2, 0, 3, 0.2), 0 0 16px rgba(2, 0, 3, 0.08)" }}>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span>{getIcon()}</span>
              {popup.title}
            </h2>
            <div className="mt-2 text-gray-700">{popup.message}</div>
            {renderButtons()}
          </div>
        </div>
      )}
    </PopupContext.Provider>
  );
};
