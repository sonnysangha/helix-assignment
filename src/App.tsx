import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators, Dispatch, Action } from 'redux';
import Viewer from 'react-viewer';
import Spinner from 'react-spinkit';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import { ImageDecorator } from 'react-viewer/lib/ViewerProps';
import { AppState } from './reducers/rootReducer';
import { startLoading, stopLoading } from './actions/sampleActions';

import './App.scss';
import 'react-viewer/dist/index.css';
import { getImages } from './selectors/sampleSelector';
import { config } from './env';

const vision = require('node-cloud-vision-api');
vision.init({ auth: config.VISION_API_KEY });

type Props = {
  images: string[],
  startLoading: () => Action;
  stopLoading: () => Action;
  loading: boolean;
}

type State = {
  visible: boolean,
  categoryMapping: any[],
  selectedImage: ImageDecorator,
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
      categoryMapping: [],
      selectedImage: {
        src: ''
      }
    }
  }

  /**
   * NOT a good idea to have ASYNC operations inside a component!
   * 
   * Given more time i'd move this to dispatch a 'LoadImages' action which would be handled
   * via Redux-Saga and upon completion would dispatch a 'LoadImagesSuccess' action
   * which would update the 'categoryMapping' variable in a reducer which would then
   * be used to render the component
   */
  async componentWillMount() {
    const categoryMapping: any = [];
    let noOfImagesLoaded = 0;
    this.props.startLoading();

    await this.props.images.forEach(async imageUrl => {
      const sourceUrl = `https://storage.googleapis.com/${imageUrl}`;
      const req = new vision.Request({
        image: new vision.Image({ url: sourceUrl }),
        features: [
          new vision.Feature('LABEL_DETECTION', 1)]
      });

      try {
        const res = await vision.annotate(req); // send request to Google vision API
        const { description } = res.responses[0].labelAnnotations[0];

        if (categoryMapping[description]) {
          // category already added to map
          categoryMapping[description].push({ src: sourceUrl, downloadUrl: sourceUrl });
        } else {
          // category not yet identified, add a new category to map
          categoryMapping[description] = [
            {
              src: sourceUrl,
              downloadUrl: sourceUrl
            }
          ];
        }

        // Update the state
        this.setState({ categoryMapping })
        noOfImagesLoaded++;
        // Turn loader off when we near the number of images in the file (some may not load)
        if (noOfImagesLoaded > this.props.images.length - 10) this.props.stopLoading()

      } catch (e) {
        // In the event a request fails, we log & prevent a crash
        // console.log(e);
      }
    });
  }

  render() {
    return (
      <Card className="container">
        <Typography variant="h2" gutterBottom className="text header">
          Helix Assignment
        </Typography>
        <Typography variant="subtitle1" gutterBottom className="text subheading">
          Find the images seperated below by category, select one to open the viewer!
        </Typography>
        {this.props.loading &&
          <Spinner className="spinner" name='chasing-dots' />}

        {
          _.keys(this.state.categoryMapping).map((category: string) => {
            return (
              <Card
                className="container category"
                key={category}
              >
                <CardHeader
                  title={_.capitalize(category)}
                />
                {
                  //@ts-ignore
                  this.state.categoryMapping[category].map((image: ImageDecorator) => (
                    <img
                      className="image"
                      src={image.src}
                      alt=""
                      key={image.src}
                      onClick={() => this.setState({
                        visible: true,
                        selectedImage: {
                          src: image.src,
                          downloadUrl: image.downloadUrl
                        }
                      })} />
                  ))
                }
                <Viewer
                  visible={this.state.visible}
                  onClose={() => {
                    this.setState({ visible: false });
                  }}
                  images={[this.state.selectedImage]}
                  downloadable />
              </Card>
            )
          })
        }
      </Card>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  images: getImages(state), // example of a selector
  loading: state.sample.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  startLoading,
  stopLoading,
}, dispatch);

const AppConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppConnect;
