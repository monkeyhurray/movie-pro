import Form from "react-bootstrap/Form";

function Community() {
  return (
    <>
      <FormFileExample />
    </>
  );
}

function FormFileExample() {
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
    </>
  );
}

export default Community;
