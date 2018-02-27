import * as LinkUtil from '../utils/link_api_util';

export const RECEIVE_LINK = 'RECEIVE_LINK';
export const RECEIVE_NODE_LINKS = 'RECEIVE_NODE_LINKS';
export const RECEIVE_LINK_ERRORS = 'RECEIVE_LINK_ERRORS';
export const REMOVE_LINK = 'REMOVE_LINK';

export const receiveLink = link => ({
  type: RECEIVE_LINK,
  link
});

export const receiveAllLinks = links => ({
  type: RECEIVE_NODE_LINKS,
  links
});

export const receiveLinkErrors = errors => ({
  type: RECEIVE_LINK_ERRORS,
  errors
});

export const removeLink = link => ({
  type: REMOVE_LINK,
  link
});

export const createLink = link => dispatch => (
  LinkUtil.postLink(link)
    .then(newLink => dispatch(receiveLink(link)))
    .catch(errors => dispatch(receiveLinkErrors(errors)))
);

export const fetchNodeLinks = sourceId => dispatch => (
  LinkUtil.getLinks(sourceId)
    .then(links => dispatch(receiveAllLinks(links)))
    .catch(errors => dispatch(receiveLinkErrors(errors)))
);

export const fetchLink = linkId => dispatch => (
  LinkUtil.getLink(linkId)
  .then(link => dispatch(receiveLink(link)))
  .catch(errors => dispatch(receiveLinkErrors(errors)))
);

export const editLink = link => dispatch => (
  LinkUtil.patchLink(link)
    .then(editedLink => dispatch(receiveLink(editedLink)))
    .catch(errors => dispatch(receiveLinkErrors(errors)))
);

export const deleteLink = linkId => dispatch => (
  LinkUtil.deleteLink(linkId)
    .then(link => dispatch(removeLink(link)))
    .catch(errors => dispatch(receiveLinkErrors(errors)))
);
