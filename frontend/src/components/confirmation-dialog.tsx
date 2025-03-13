import React from 'react';
import Dialog from './dialog';
import Button from './button';

interface ConfirmationDialogProps {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, message, onConfirm, onCancel }) => {
    return (
        <Dialog isOpen={isOpen} message={message} onClose={onCancel}>
            <button className="close-button" onClick={onCancel}>×</button>
            <div className="dialog-buttons">
                <Button onClick={onConfirm} className="primary small-button">Confirm</Button>
                <Button onClick={onCancel} className="secondary small-button">Cancel</Button>
            </div>
        </Dialog>
    );
};

/**
 * <h1>{@link ConfirmationDialog}</h1>
 */
export default ConfirmationDialog;
