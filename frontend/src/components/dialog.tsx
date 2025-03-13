import React, { useEffect } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import './Dialog.scss';
import Button from './button';

interface DialogProps {
  isOpen: boolean,
  message: string,
  onClose: () => void,
  children?: React.ReactNode,
  opened?: boolean,
  onOpenedChanged?: (e: CustomChangeEvent) => void
}

interface CustomChangeEvent {
  target: { value: boolean | undefined };
  nativeEvent: Event;
  currentTarget: HTMLInputElement;
  bubbles: boolean;
  cancelable: boolean;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  preventDefault: () => void;
  isDefaultPrevented: () => boolean;
  stopPropagation: () => void;
  isPropagationStopped: () => boolean;
  timeStamp: number;
  type: string;
  persist: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  message,
  onClose,
  children,
  opened,
  onOpenedChanged
}) => {
  useEffect(() => {
    if (onOpenedChanged) {
      const event: CustomChangeEvent = {
        target: { value: opened },
        nativeEvent: {} as Event,
        currentTarget: {} as HTMLInputElement,
        bubbles: false,
        cancelable: false,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        preventDefault: () => {},
        isDefaultPrevented: () => false,
        stopPropagation: () => {},
        isPropagationStopped: () => false,
        timeStamp: Date.now(),
        type: 'change',
        persist: () => {}
      };
      onOpenedChanged(event);
    }
  }, [opened, onOpenedChanged]);

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <Draggable>
        <ResizableBox width={300} height={200} minConstraints={[150, 100]} maxConstraints={[600, 400]}>
          <div className="dialog">
            <p>{message}</p>
            {children} {/* Render children */}
            <Button onClick={onClose} className="small-button">Close</Button>
          </div>
        </ResizableBox>
      </Draggable>
    </div>
  );
};

/**
 * <h1>{@link Dialog}</h1>
 * dialog component.
 */
export default Dialog;
