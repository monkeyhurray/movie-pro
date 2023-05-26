import "../scss/Wirting.scss";
import { useNavigate } from "react-router-dom";
import { Form, FloatingLabel, Button } from "react-bootstrap";
function Wirting() {
  return (
    <div className="wirtingFrame">
      <FormFloatingTextareaExample />
      <SizesExample />
    </div>
  );
}

function FormFileExample() {
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control type="file" />
      </Form.Group>
    </>
  );
}

function FormFloatingTextareaExample() {
  return (
    <>
      <FloatingLabel
        controlId="floatingTextarea"
        label="Title"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" />
      </FloatingLabel>
      <FormFileExample />
      <FloatingLabel
        controlId="floatingTextarea2"
        label="Comments"
        className="textFrame"
      >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "300px" }}
        />
      </FloatingLabel>
    </>
  );
}
function SizesExample() {
  let navigate = useNavigate();
  return (
    <>
      <div className="mb-2">
        <Button variant="primary" size="lg">
          Complete
        </Button>{" "}
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            navigate("/community");
          }}
        >
          Cancel
        </Button>
      </div>
    </>
  );
}

export default Wirting;
