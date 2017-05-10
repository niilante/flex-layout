/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/** Applies CSS prefixes to appropriate style keys.*/
export function applyCssPrefixes(target) {
  for (let key in target) {

    let value = target[key] || "";
    let boxValue = toBoxValue(value);
    let boxDirection = toBoxDirection(value);
    let boxOrient = toBoxOrient(value);

    switch (key) {
      case 'display':
        if (value === 'flex') {
          target['display'] = [
            '-webkit-box',
            '-ms-flexbox',
            'flex'
          ];
        } else if (value === 'inline-flex') {
          target['display'] = [
            '-webkit-inline-box',
            '-ms-inline-flexbox',
            'inline-flex'
          ];
        } else {
          target['display'] = value;
        }
        break;

      case 'flex':
        target['-ms-flex'] = value;
        target['-webkit-box-flex'] = value.split(" ")[0];
        break;

      case 'flex-direction':
        value = value || "row";
        target['-webkit-box-orient'] = boxOrient;
        target['-webkit-box-direction'] = boxDirection;
        target['-ms-flex-direction'] = value;
        target['flex-direction'] = value;
        break;

      case 'flex-wrap':
        target['-ms-flex-wrap'] = value;
        break;

      case 'flex-grow':
        target['-webkit-box-flex'] = value;
        target['-ms-flex-positive'] = value;
        break;

      case 'flex-shrink':
        target['-ms-flex-negative'] = value;
        break;

      case 'flex-basis':
        target['-ms-flex-preferred-size'] = value;
        break;

      case 'flex-flow':
        target['-ms-flex-flow'] = value;
        target['-webkit-box-orient'] = boxOrient;
        target['-webkit-box-direction'] = boxDirection;
        target['-ms-flex-flow'] =  value;

        break;

      case 'order':
        if (isNaN(value)) {
          value = "0";
        }
        target['-ms-flex-order'] = value;
        target['-webkit-box-ordinal-group'] = toBoxOrdinal(value);
        target['order'] = value;
        break;

      case 'justify-content':
        target['-ms-flex-pack'] = boxValue;
        target['-webkit-box-pack'] = boxValue;
        target[key] = value;
        break;

      case 'align-items':
        target['-ms-flex-align'] = boxValue;
        target['-webkit-box-align'] = boxValue;
        target[key] = value;
        break;

      case 'align-self':
        target['-webkit-align-self'] = value;
        target['-ms-flex-item-align'] = boxValue;
        target[key] = value;
        break;

      case 'align-content':
        target['-ms-flex-line-pack'] = toAlignContentValue(value);
        target[key] = value;
        break;
    }
  }
  return target;
}

export function toAlignContentValue(value: string) {
  switch (value) {
    case "space-between" :
      return "justify";
    case "space-around"  :
      return "distribute";
    default :
      return toBoxValue(value);
  }
}

/** Convert flex values flex-start, flex-end to start, end. */
export function toBoxValue(value = "") {
  return (value == 'flex-start') ? 'start' : ((value == 'flex-end') ? 'end' : value);
}

/** Convert flex Direction to Box orientations */
export function toBoxOrient(flexDirection = 'row') {
  return flexDirection.indexOf('column') === -1 ? 'horizontal' : 'vertical';
}

/** Convert flex Direction to Box direction type */
export function toBoxDirection(flexDirection = 'row') {
  return flexDirection.indexOf('reverse') !== -1 ? 'reverse' : 'normal';
}

/** Convert flex order to Box ordinal group */
export function toBoxOrdinal(order = '0') {
  let value = order ? parseInt(order) + 1 : 1;
  return isNaN(value) ? "0" : value.toString();
}
