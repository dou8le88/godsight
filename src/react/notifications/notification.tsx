import { ViewTransition } from 'react';

export interface GodsightNotification {
  key: string;
  type: NotificationType;
  message: string;
  expiration: number;
  action?: {
    buttonText: string;
    onClick: () => void;
  };
}

export enum NotificationType {
  INFO = 'info',
  ERROR = 'error',
}

export function Notification({
  notification,
  onExit,
}: {
  notification: GodsightNotification;
  onExit: () => void;
}) {
  return (
    <ViewTransition>
      <div className="notification">
        <div className={`notification-body ${notification.type}`}>
          {notification.message}
        </div>
        <div className="notification-buttons">
          {notification.action ? (
            <div
              className="notification-action"
              onClick={() => notification.action?.onClick()}
            >
              {notification.action.buttonText}
            </div>
          ) : (
            <></>
          )}
          <div
            className="notification-close"
            onClick={() => onExit()}
          >
            X
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
