import {
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardBody,
  Col,
  Row
} from "reactstrap";

interface CardsListProps {
    isLoading: Boolean;
    videos: any[];
    cardsCount: number;
  }

//Show Cards List
const CardsList = (props: CardsListProps) => (
  <Row>
    {/* Show Loader */}
    {props.isLoading ? (
      <div
        style={{
          textAlign: "center",
          paddingTop: "9rem"
        }}
      >
        <div className="spinner-border" role="status"></div>
      </div>
    ) : props.videos.length === 0 ? (
      // Handle no data found
      <div
        style={{
          textAlign: "center",
          paddingTop: "9rem"
        }}
      >
        No Music Found!
      </div>
    ) : (
      //Paginated view of cards
      props.videos
        .slice(0, props.cardsCount)
        .map(({ image_url, artist, title, id }: any) => (
          <Col sm="4" xs="12" lg="3" key={id}>
            <Card
              outline
              color="success"
              className="m-2 text-center"
              style={{ maxHeight: "20rem" }}
            >
              <CardImg
                style={{
                  width: "100%",
                  height: "50vw",
                  objectFit: "cover"
                }}
                src={image_url}
                alt={title}
              />
              <CardBody>
                <CardTitle tag="h6">{artist}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  {title}
                </CardSubtitle>
              </CardBody>
            </Card>
          </Col>
        ))
    )}
  </Row>
);

export default CardsList;
