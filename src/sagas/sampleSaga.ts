import { takeEvery, put } from 'redux-saga/effects';
import { types as sampleTypes, loadImagesSuccess } from '../actions/sampleActions';
import { SagaIterator } from 'redux-saga';
import _ from 'lodash';

import * as data from '../data';

const vision = require('node-cloud-vision-api')
vision.init({ auth: 'AIzaSyBaVgdjfBjX-S5EfKhvdZj_DKhju9mbPNI' })

function* loadImages(): SagaIterator {
    console.log('abc');
}

export default function* sampleSaga() {
    yield takeEvery(sampleTypes.LOAD_IMAGES, loadImages);
}