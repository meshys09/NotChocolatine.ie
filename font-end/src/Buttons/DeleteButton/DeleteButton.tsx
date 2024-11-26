import React from "react";

interface DeleteButtonProps {
    id: number;
    url: string;
    onConfirm: () => void;
}

function DeleteButton({ id, url, onConfirm }: DeleteButtonProps) {
    const handleDelete = async () => {
        const userConfirmed = window.confirm('Do you wish to delete this item ?');
        if (!userConfirmed) return;

        try {
            const response = await fetch(`http://localhost:3000/${url}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete item with ID ${id}`);
            }

            onConfirm();
        } catch (error) {
            console.error(error);
            alert(`An error occurred: ${(error as Error).message}`);
        }
    };

    return (
        <button className="DeleteButton" onClick={handleDelete}>
            Delete
        </button>
    );
}

export default DeleteButton;