import * as CanvasUtil from '../utils/canvas_api_util';

export const RECEIVE_CANVAS = 'RECEIVE_CANVAS';
export const RECEIVE_ALL_CANVASES = 'RECEIVE_ALL_CANVASES';
export const RECEIVE_CANVAS_ERRORS = 'RECEIVE_CANVAS_ERRORS';
export const REMOVE_CANVAS = 'REMOVE_CANVAS';

export const receiveCanvas = canvas => ({
  type: RECEIVE_CANVAS,
  canvas
});

export const receiveAllCanvases = canvases => ({
  type: RECEIVE_ALL_CANVASES,
  canvases
});

export const receiveCanvasErrors = errors => ({
  type: RECEIVE_CANVAS_ERRORS,
  errors
});

export const removeCanvas = canvas => ({
  type: REMOVE_CANVAS,
  canvas
});

export const createCanvas = canvas => dispatch => (
  CanvasUtil.postCanvas(canvas)
    .then(newCanvas => dispatch(receiveCanvas(newCanvas)))
    .catch(errors => dispatch(receiveCanvasErrors(errors)))
);

export const fetchUserCanvases = ownerId => dispatch => (
  CanvasUtil.getCanvases(ownerId)
    .then(canvases => dispatch(receiveAllCanvases(canvases)))
    .catch(errors => dispatch(receiveCanvasErrors(errors)))
);

export const fetchCanvas = canvasId => dispatch => (
  CanvasUtil.getCanvas(canvasId)
    .then(canvas => dispatch(receiveCanvas(canvas)))
    .catch(errors => dispatch(receiveCanvasErrors(errors)))
);

export const editCanvas = canvas => dispatch => (
  CanvasUtil.patchCanvas(canvas)
    .then(editedCanvas => dispatch(receiveCanvas(editedCanvas)))
    .catch(errors => dispatch(receiveCanvasErrors(errors)))
);

export const deleteCanvas = canvasId => dispatch => (
  CanvasUtil.deleteCanvas(canvasId)
    .then(canvas => dispatch(removeCanvas(canvas)))
    .catch(errors => dispatch(receiveCanvasErrors(errors)))
);
