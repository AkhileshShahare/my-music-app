import { Col, Row } from "reactstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";

interface FilterProps {
    filter: {action: string};
    genres: any[];
    handleChange: (option: any, { action, name }: { action: any; name: any; }) => void;
    releaseYear: string;
  }

  const animatedComponents = makeAnimated();

const Filters = (props : FilterProps) => (
  <Row className="justify-content-center">
    <Col xs={12} sm={5} className="m-2">
      <Select
        isMulti
        value={props.filter["genre"]}
        name="genre"
        options={props.genres}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Select Genres..."
        components={animatedComponents}
        onChange={props.handleChange}
      />
    </Col>
    <Col xs={12} sm={5} className="m-2">
      <Select
        value={props.filter["RY"]}
        className="basic-single"
        classNamePrefix="select"
        isClearable={true}
        isSearchable={true}
        name="RY"
        placeholder="Select Year..."
        options={props.releaseYear}
        onChange={props.handleChange}
      />
    </Col>
  </Row>
);

export default Filters;
