import Toast from 'react-bootstrap/Toast';
import 'bootstrap/dist/css/bootstrap.min.css';

function ToastMenu({ toast, setToast }) {
    return (
        <Toast className='bg-secondary' show={toast.checked} delay={3000} autohide
            style={{ position: "absolute", top: "10px", right: "13px" }}
            onClose={() => setToast({ checked: false, title: "", message: "" })}
        >
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">{toast.title}</strong>
                <small></small>
            </Toast.Header>
            <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
    );
};

export default ToastMenu;