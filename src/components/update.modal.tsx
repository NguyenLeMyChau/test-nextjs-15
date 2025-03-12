import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface ModalProps {
    blogBase: BlogData;
    setBlogBase: (value: BlogData) => void;
    updateModal: boolean;
    setUpdateModal: (value: boolean) => void;
}

function UpdateModal({ blogBase, setBlogBase, updateModal, setUpdateModal }: ModalProps) {

    const handleClickCreateNew = async (event: React.FormEvent) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form
        try {
            const response = await fetch(`https://67cff383823da0212a83efee.mockapi.io/blogs/${blogBase.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: blogBase.title,
                    author: blogBase.author,
                    content: blogBase.content,
                }),
            });

            if (!response.ok) {
                toast.error('Update error !')
            };

            const data = await response.json();
            console.log("User created:", data);

            toast.success('Create update blog !')
            setUpdateModal(false);
            mutate("https://67cff383823da0212a83efee.mockapi.io/blogs");
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <Modal
            show={updateModal}
            onHide={() => setUpdateModal(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Update New Blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleClickCreateNew}>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={blogBase.title}
                            onChange={(e) => setBlogBase({ ...blogBase, title: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter author"
                            value={blogBase.author}
                            onChange={(e) => setBlogBase({ ...blogBase, author: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicContent">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea" rows={3}
                            placeholder="Enter content"
                            value={blogBase.content}
                            onChange={(e) => setBlogBase({ ...blogBase, content: e.target.value })} />
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setUpdateModal(false)}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary" onClick={handleClickCreateNew}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UpdateModal;