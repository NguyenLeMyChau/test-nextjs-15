import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface ModalProps {
    createModal: boolean;
    setCreateModal: (value: boolean) => void;
}

function ModalExample({ createModal, setCreateModal }: ModalProps) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleClickCreateNew = async (event: React.FormEvent) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form
        try {
            const response = await fetch("https://67cff383823da0212a83efee.mockapi.io/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    author: author,
                    content: content,
                }),
            });

            if (!response.ok) {
                toast.error('Create error !')
            };

            const data = await response.json();
            console.log("User created:", data);

            toast.success('Create success blog !')
            handleCloseModal();
            mutate("https://67cff383823da0212a83efee.mockapi.io/blogs");
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleCloseModal = () => {
        setTitle('');
        setAuthor('');
        setContent('');
        setCreateModal(false);
    }

    return (
        <Modal
            show={createModal}
            onHide={() => setCreateModal(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Create New Blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleClickCreateNew}>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicContent">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea" rows={3}
                            placeholder="Enter content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setCreateModal(false)}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary" onClick={handleClickCreateNew}>
                            Post
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalExample;