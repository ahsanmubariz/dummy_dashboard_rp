import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {/* Judul Modal */}
                {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

                {/* Konten Modal (diterima melalui children) */}
                <div className="mb-4">{children}</div>

                {/* Tombol Batal */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;